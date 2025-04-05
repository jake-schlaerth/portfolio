import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { messagesAtom } from "../../../../atoms";
import { useWhiteboardHistory } from "./hooks";

interface DrawData {
  color: string;
  points: { x: number; y: number }[];
  isFinalPoint?: boolean;
  offset?: { x: number; y: number };
}

interface RemoteCanvasProps {
  whiteboardId: string;
  offset: { x: number; y: number };
}

export function RemoteCanvas({ whiteboardId, offset }: RemoteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const history = useWhiteboardHistory(whiteboardId);
  const messages = useAtomValue(messagesAtom);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext("2d");

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    return () => {
      canvasRef.current = null;
      contextRef.current = null;
    };
  }, []);

  const drawRemote = (drawData: DrawData) => {
    if (!drawData.points[0]) return;
    if (!contextRef.current) return;

    const { color, points, isFinalPoint } = drawData;

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

  const redrawAll = () => {
    if (!contextRef.current || !canvasRef.current) return;

    contextRef.current.setTransform(1, 0, 0, 1, 0, 0);
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.setTransform(1, 0, 0, 1, offset.x, offset.y);

    history.map((segment) => segment.payload).forEach(drawRemote);
    messages.forEach((message) => {
      try {
        const { payload } = JSON.parse(message);
        drawRemote(payload);
      } catch (error) {
        console.error("Invalid message format:", error);
      }
    });
  };

  useEffect(() => {
    redrawAll();
  }, [offset, history, messages]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 bg-transparent touch-none z-[1] pointer-events-none"
    />
  );
}
