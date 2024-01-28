"use client";
import { useEffect, useRef } from "react";
import { scaleSineWave } from "../utils";
import { Tone } from "@/lib/Tone";

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

    function playTone() {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease("C4", "8n");
      console.log("trigger");
    }

    function draw() {
      if (!ctx || !canvas) {
        return;
      }

      const x = scaleSineWave(amplitudeX, oscillatorX);
      const y = scaleSineWave(amplitudeY, oscillatorY);

      oscillatorX += frequencyX;
      oscillatorY += frequencyY;

      if (x <= 1 || x >= canvas.width - 1 || y <= 1 || y >= canvas.height - 1) {
        playTone();
      }

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
