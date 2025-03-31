import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { messagesAtom } from "../../../../atoms";
import { useWhiteboardHistory } from "./hooks";

interface DrawData {
  color: string;
  points: { x: number; y: number }[];
  isFinalPoint?: boolean;
}

interface RemoteCanvasProps {
  whiteboardId: string;
}

export function RemoteCanvas({ whiteboardId }: RemoteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const history = useWhiteboardHistory(whiteboardId);
  const messages = useAtomValue(messagesAtom);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;

    return () => {
      canvasRef.current = null;
      contextRef.current = null;
    };
  }, []);

  useEffect(() => {
    history.forEach(drawRemote);
  }, [history]);

  useEffect(() => {
    messages.forEach((message) => {
      try {
        const { payload } = JSON.parse(message);
        drawRemote(payload);
      } catch (error) {
        console.error("Invalid message format:", error);
      }
    });
  }, [messages]);

  const drawRemote = (drawData: DrawData) => {
    if (!contextRef.current) return;

    const { color, points, isFinalPoint } = drawData;
    if (!points?.length) return;

    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = 5;
    contextRef.current.lineCap = "round";

    contextRef.current.beginPath();
    contextRef.current.moveTo(points[0].x, points[0].y);

    for (const point of points.slice(1)) {
      contextRef.current.lineTo(point.x, point.y);
    }

    contextRef.current.stroke();
    if (isFinalPoint) {
      contextRef.current.closePath();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 border border-black bg-transparent touch-none z-[1] pointer-events-none"
    />
  );
}
