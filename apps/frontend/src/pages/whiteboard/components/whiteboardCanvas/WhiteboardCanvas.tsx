import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { messagesAtom } from "../../../../atoms";
import { useWebSocket, useWhiteboardHistory } from "./hooks";

interface DrawData {
  color: string;
  points: { x: number; y: number }[];
  isLive?: boolean;
}

interface WhiteboardCanvasProps {
  whiteboardId: string;
}

export function WhiteboardCanvas({ whiteboardId }: WhiteboardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const messages = useAtomValue(messagesAtom);
  const history = useWhiteboardHistory(whiteboardId);
  const { sendMessage } = useWebSocket(whiteboardId);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("white");
  const [currentPoints, setCurrentPoints] = useState<
    { x: number; y: number }[]
  >([]);
  const [lastSentPoint, setLastSentPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    history.forEach(drawOnCanvas);
  }, [history]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {
      canvasRef.current = null;
      ctxRef.current = null;
    };
  }, []);

  useEffect(() => {
    messages.forEach((message) => {
      try {
        const { payload } = JSON.parse(message);
        drawOnCanvas(payload);
      } catch (error) {
        console.error("Invalid message format:", error);
      }
    });
  }, [messages]);

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
      x: (event as React.MouseEvent).nativeEvent.offsetX,
      y: (event as React.MouseEvent).nativeEvent.offsetY,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling on mobile
    setDrawing(true);
    const { x, y } = getCoordinates(e);
    setCurrentPoints([{ x, y }]);
    setLastSentPoint({ x, y });

    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(x, y);
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;

    const { x, y } = getCoordinates(event);
    const currentPoint = { x, y };

    ctxRef.current!.strokeStyle = color;
    ctxRef.current!.lineWidth = 5;
    ctxRef.current!.lineCap = "round";
    ctxRef.current!.lineTo(x, y);
    ctxRef.current!.stroke();

    setCurrentPoints((prev) => [...prev, currentPoint]);

    if (
      lastSentPoint &&
      (Math.abs(currentPoint.x - lastSentPoint.x) > 5 ||
        Math.abs(currentPoint.y - lastSentPoint.y) > 5)
    ) {
      sendMessage(
        JSON.stringify({
          whiteboardId,
          type: "draw",
          payload: {
            color,
            points: [lastSentPoint, currentPoint],
            isLive: true,
          },
        })
      );
      setLastSentPoint(currentPoint);
    }
  };

  const handleEnd = () => {
    setDrawing(false);
    ctxRef.current?.closePath();

    sendMessage(
      JSON.stringify({
        whiteboardId,
        type: "draw",
        payload: {
          color,
          points: currentPoints,
          isLive: false,
        },
      })
    );

    setCurrentPoints([]);
    setLastSentPoint(null);
  };

  const drawOnCanvas = (drawData: DrawData) => {
    if (!ctxRef.current) return;

    const { color, points, isLive } = drawData;
    if (!points?.length) return;

    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = 5;
    ctxRef.current.lineCap = "round";

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(points[0].x, points[0].y);

    for (const point of points.slice(1)) {
      ctxRef.current.lineTo(point.x, point.y);
    }

    ctxRef.current.stroke();
    if (!isLive) {
      ctxRef.current.closePath();
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{
          border: "1px solid black",
          background: "gray",
          touchAction: "none",
        }}
      />
      <div>
        <button onClick={() => setColor("white")}>🖊️ white</button>
        <button onClick={() => setColor("red")}>🖊️ red</button>
        <button onClick={() => setColor("blue")}>🖊️ blue</button>
        <button onClick={() => setColor("green")}>🖊️ green</button>
      </div>
    </div>
  );
}
