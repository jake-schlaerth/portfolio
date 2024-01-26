"use client";
import { useEffect, useRef } from "react";

export const SineWaveLine = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      // Canvas element not available yet, exit the function
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let xOscillator = 0;
    let yOscillator = 0;
    const frequencyX = 0.02;
    const frequencyY = 0.0302;
    const amplitudeX = canvas.width;
    const amplitudeY = canvas.height;

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);

    function draw() {
      if (!ctx) {
        return;
      }
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);

      const x = amplitudeX * ((Math.sin(xOscillator) + 1) / 2);
      const y = amplitudeY * ((Math.sin(yOscillator) + 1) / 2);

      xOscillator += frequencyX;
      yOscillator += frequencyY;

      ctx.lineTo(x, y);
      ctx.stroke();

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={80} // Adjust the canvas width as needed
        height={60} // Adjust the canvas height as needed
      />
    </div>
  );
};
