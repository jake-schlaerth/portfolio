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

// Where the emitter sits until the user moves it: off to the right, clear of
// the (left-aligned) text. Normalized coords, origin bottom-left.
const START_POS: [number, number] = [0.85, 0.5];

// The emitter always wobbles around its anchor so it keeps stirring the fluid.
const WOBBLE_RADIUS = 0.015;
const WOBBLE_FORCE = 0.12;

// Presses that start on these are the page's own controls, not blob steering.
const INTERACTIVE = "a, button, input, textarea, select, iframe, label";

/**
 * Fixed, full-viewport WebGL2 fluid sim rendered behind page content.
 * Ignores pointer events itself (the page stays fully clickable). A single
 * emitter wobbles at an anchor point, continuously exciting the fluid. Click
 * or click-and-drag anywhere on the window to move the anchor; it stays at the
 * last point until moved again. On touch devices, dragging to scroll made the
 * sim spasm, so touch input is ignored and the emitter stays at its start.
 */
export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

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

    let anchorX = START_POS[0];
    let anchorY = START_POS[1];
    let lastX = 0;
    let lastY = 0;
    // Drag velocity, decayed each frame and added on top of the wobble.
    let dragDX = 0;
    let dragDY = 0;

    function moveAnchor(e: PointerEvent, isDown: boolean) {
      if (isDown) {
        dragDX = 0;
        dragDY = 0;
      } else {
        dragDX = (e.clientX - lastX) * 0.01;
        dragDY = -(e.clientY - lastY) * 0.01;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      anchorX = e.clientX / window.innerWidth;
      anchorY = 1 - e.clientY / window.innerHeight;
    }
    // Dragging to steer the emitter must not select text or drag links.
    let dragging = false;
    function blockWhileDragging(e: Event) {
      if (dragging) e.preventDefault();
    }
    function handlePointerDown(e: PointerEvent) {
      if (e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) return;
      dragging = true;
      moveAnchor(e, true);
    }
    function handlePointerUp() {
      dragging = false;
    }
    function handlePointerMove(e: PointerEvent) {
      if (dragging && e.buttons & 1) moveAnchor(e, false);
    }
    if (!isTouchDevice) {
      window.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
      window.addEventListener("selectstart", blockWhileDragging);
      window.addEventListener("dragstart", blockWhileDragging);
    }

    let emitterFrame = requestAnimationFrame(function emitter(ts) {
      emitterFrame = requestAnimationFrame(emitter);

      const t = ts * 0.003;
      const x = anchorX + WOBBLE_RADIUS * Math.sin(t * 1.3);
      const y = anchorY + WOBBLE_RADIUS * Math.cos(t * 0.9);
      const fx = WOBBLE_FORCE * Math.cos(t * 1.3) + dragDX;
      const fy = -WOBBLE_FORCE * Math.sin(t * 0.9) + dragDY;
      dragDX *= 0.85;
      dragDY *= 0.85;

      setBrush(renderer, x, y, true);
      setUniforms(renderer, { u_forceDir: [fx, fy] });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isTouchDevice) {
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        window.removeEventListener("selectstart", blockWhileDragging);
        window.removeEventListener("dragstart", blockWhileDragging);
      }
      cancelAnimationFrame(emitterFrame);
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
