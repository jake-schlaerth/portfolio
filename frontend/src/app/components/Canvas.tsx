"use client";
import { useEffect, useRef } from "react";
import { scaleSineWave } from "../utils";

interface CanvasProps {
  canvasHeight: number;
  canvasWidth: number;
  displayHeight: number;
  displayWidth: number;
  frequencyX?: number;
  frequencyY?: number;
}

export const Canvas = ({
  canvasHeight,
  canvasWidth,
  displayHeight,
  displayWidth,
  frequencyX = 0.02,
  frequencyY = 0.013,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let oscillatorX = 0;
    let oscillatorY = 0;
    const amplitudeX = canvas.width;
    const amplitudeY = canvas.height;

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);

    function draw() {
      if (!ctx) {
        return;
      }

      const x = scaleSineWave(amplitudeX, oscillatorX);
      const y = scaleSineWave(amplitudeY, oscillatorY);

      oscillatorX += frequencyX;
      oscillatorY += frequencyY;

      ctx.lineTo(x, y);
      ctx.stroke();

      requestAnimationFrame(draw);
    }

    draw();
  });

  return (
    <div>
      <canvas
        ref={canvasRef}
        height={canvasHeight}
        width={canvasWidth}
        style={{ width: `${displayWidth}px`, height: `${displayHeight}px` }}
      />
    </div>
  );
};
