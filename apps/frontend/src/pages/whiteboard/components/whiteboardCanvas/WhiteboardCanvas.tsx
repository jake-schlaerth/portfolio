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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentDrawing, setCurrentDrawing] = useState<{
    color: string;
    points: { x: number; y: number }[];
  } | null>(null);
  const [localDrawings, setLocalDrawings] = useState<
    Array<{
      color: string;
      points: { x: number; y: number }[];
      isFinalPoint: boolean;
    }>
  >([]);

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

  useEffect(() => {
    if (!contextRef.current || !canvasRef.current) return;

    contextRef.current.setTransform(1, 0, 0, 1, 0, 0);
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.setTransform(1, 0, 0, 1, offset.x, offset.y);

    localDrawings.forEach((drawing) => {
      contextRef.current!.strokeStyle = drawing.color;
      contextRef.current!.lineWidth = 5;
      contextRef.current!.lineCap = "round";
      contextRef.current!.beginPath();
      contextRef.current!.moveTo(drawing.points[0].x, drawing.points[0].y);
      for (const point of drawing.points.slice(1)) {
        contextRef.current!.lineTo(point.x, point.y);
      }
      contextRef.current!.stroke();
      if (drawing.isFinalPoint) {
        contextRef.current!.closePath();
      }
    });

    if (currentDrawing) {
      contextRef.current.strokeStyle = currentDrawing.color;
      contextRef.current.lineWidth = 5;
      contextRef.current.lineCap = "round";
      contextRef.current.beginPath();
      contextRef.current.moveTo(
        currentDrawing.points[0].x,
        currentDrawing.points[0].y
      );
      for (const point of currentDrawing.points.slice(1)) {
        contextRef.current.lineTo(point.x, point.y);
      }
      contextRef.current.stroke();
    }
  }, [offset, localDrawings, currentDrawing]);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: clientX - rect.left - offset.x,
      y: clientY - rect.top - offset.y,
    };
  };

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (event.nativeEvent instanceof MouseEvent) {
      if (event.nativeEvent.button === 2) {
        setIsPanning(true);
        setLastPanPoint({
          x: event.nativeEvent.clientX,
          y: event.nativeEvent.clientY,
        });
        return;
      }
    }
    setIsDrawing(true);
    const { x, y } = getCoordinates(event);
    setLastSentPoint({ x, y });
    setCurrentDrawing({
      color,
      points: [{ x, y }],
    });

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (isPanning && lastPanPoint) {
      let currentX, currentY;
      if ("touches" in event) {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
      } else {
        currentX = event.clientX;
        currentY = event.clientY;
      }
      const deltaX = currentX - lastPanPoint.x;
      const deltaY = currentY - lastPanPoint.y;
      setOffset((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setLastPanPoint({ x: currentX, y: currentY });
      return;
    }

    if (!isDrawing) return;

    const { x, y } = getCoordinates(event);
    const currentPoint = { x, y };

    contextRef.current!.strokeStyle = color;
    contextRef.current!.lineWidth = 5;
    contextRef.current!.lineCap = "round";
    contextRef.current!.lineTo(x, y);
    contextRef.current!.stroke();

    setCurrentDrawing((prev) =>
      prev
        ? {
            ...prev,
            points: [...prev.points, currentPoint],
          }
        : null
    );

    sendMessage(
      JSON.stringify({
        whiteboardId,
        type: "draw",
        payload: {
          color,
          points: [lastSentPoint, currentPoint],
          isFinalPoint: false,
          offset,
        },
      })
    );
    setLastSentPoint(currentPoint);
  };

  const handleEnd = (event: React.MouseEvent | React.TouchEvent) => {
    if (isPanning) {
      setIsPanning(false);
      setLastPanPoint(null);
      return;
    }

    setIsDrawing(false);
    contextRef.current?.closePath();

    if (currentDrawing) {
      setLocalDrawings((prev) => [
        ...prev,
        {
          ...currentDrawing,
          isFinalPoint: true,
        },
      ]);
      setCurrentDrawing(null);
    }

    sendMessage(
      JSON.stringify({
        whiteboardId,
        type: "draw",
        payload: {
          color,
          points: [lastSentPoint],
          isFinalPoint: true,
          offset,
        },
      })
    );

    setLastSentPoint(null);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 bg-gray-500 w-full h-[90vh]" />
      <RemoteCanvas whiteboardId={whiteboardId} offset={offset} />
      <canvas
        ref={canvasRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onContextMenu={handleContextMenu}
        style={{
          cursor: isPanning ? "grabbing" : "default",
        }}
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
