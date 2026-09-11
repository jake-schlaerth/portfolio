import { useEffect, useRef } from "react";
import {
  createRenderer,
  start,
  stop,
  resize,
  destroy,
  setUniforms,
  setBrush,
  type RendererState,
} from "./engine";

// "Ink in Water" tuning, ported from the fluid-sim project's default preset.
const DEFAULT_UNIFORMS = {
  u_viscosity: 0.001,
  u_vorticity: 0.3,
  u_dissipation: 0.98,
  u_forceRadius: 0.05,
};

// After this long without real cursor movement, the sim drives itself so the
// background never goes fully still.
const IDLE_TIMEOUT_MS = 1500;

/**
 * Fixed, full-viewport WebGL2 fluid sim rendered behind page content.
 * Ignores pointer events itself (the page stays fully clickable) but reacts
 * to the cursor moving anywhere on the window.
 */
export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let renderer: RendererState;
    try {
      renderer = createRenderer(canvas);
    } catch (err) {
      console.warn("Fluid background disabled (WebGL2 unavailable):", err);
      return;
    }

    setUniforms(renderer, DEFAULT_UNIFORMS);
    start(renderer);

    function handleResize() {
      resize(renderer, window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    let lastMoveTime = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    function handlePointerMove(e: PointerEvent) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = performance.now();

      setBrush(
        renderer,
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
        true,
      );
      setUniforms(renderer, { u_forceDir: [dx * 0.01, -dy * 0.01] });
    }
    function handlePointerLeave() {
      lastMoveTime = 0;
      setBrush(renderer, -1, -1, false);
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    let autopilotFrame = requestAnimationFrame(function autopilot(ts) {
      autopilotFrame = requestAnimationFrame(autopilot);
      if (performance.now() - lastMoveTime < IDLE_TIMEOUT_MS) return;

      const t = ts * 0.00015;
      const x = 0.5 + 0.32 * Math.sin(t * 1.3);
      const y = 0.5 + 0.28 * Math.cos(t * 0.9);
      const dx = 0.32 * 1.3 * Math.cos(t * 1.3);
      const dy = -0.28 * 0.9 * Math.sin(t * 0.9);

      setBrush(renderer, x, y, true);
      setUniforms(renderer, { u_forceDir: [dx * 0.4, dy * 0.4] });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(autopilotFrame);
      stop(renderer);
      destroy(renderer);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Scrim so text stays readable over bright/colorful parts of the sim */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10, 10, 14, 0.45)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
};
