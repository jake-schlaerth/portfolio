import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "./hooks";
import { RemoteCanvas } from "./RemoteCanvas";

interface WhiteboardCanvasProps {
  whiteboardId: string;
}

export function WhiteboardCanvas({ whiteboardId }: WhiteboardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const { sendMessage } = useWebSocket(whiteboardId);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("white");
  const [lastSentPoint, setLastSentPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    contextRef.current = canvasRef.current.getContext("2d");
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight * 0.9;

    return () => {
      canvasRef.current = null;
      contextRef.current = null;
    };
  }, []);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in event) {
      const touch = event.touches[0];
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
  };

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(event);
    setLastSentPoint({ x, y });

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const { x, y } = getCoordinates(event);
    const currentPoint = { x, y };

    contextRef.current!.strokeStyle = color;
    contextRef.current!.lineWidth = 5;
    contextRef.current!.lineCap = "round";
    contextRef.current!.lineTo(x, y);
    contextRef.current!.stroke();

    sendMessage(
      JSON.stringify({
        whiteboardId,
        type: "draw",
        payload: {
          color,
          points: [lastSentPoint, currentPoint],
          isFinalPoint: false,
        },
      })
    );
    setLastSentPoint(currentPoint);
  };

  const handleEnd = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(false);
    contextRef.current?.closePath();

    sendMessage(
      JSON.stringify({
        whiteboardId,
        type: "draw",
        payload: {
          color,
          points: [lastSentPoint],
          isFinalPoint: true,
        },
      })
    );

    setLastSentPoint(null);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 bg-gray-500 w-full h-[90vh]" />
      <RemoteCanvas whiteboardId={whiteboardId} />
      <canvas
        ref={canvasRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        className="absolute top-0 left-0 border border-black bg-transparent touch-none z-[2]"
      />
      <div className="absolute top-[calc(90vh+10px)] z-[3] flex space-x-2">
        <button className="px-3 py-1 rounded" onClick={() => setColor("white")}>
          🖊️ white
        </button>
        <button className="px-3 py-1 rounded" onClick={() => setColor("red")}>
          🖊️ red
        </button>
        <button className="px-3 py-1 rounded" onClick={() => setColor("blue")}>
          🖊️ blue
        </button>
        <button className="px-3 py-1 rounded" onClick={() => setColor("green")}>
          🖊️ green
        </button>
      </div>
    </div>
  );
}
