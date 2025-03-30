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
  const localCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const remoteCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const localCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const remoteCtxRef = useRef<CanvasRenderingContext2D | null>(null);
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
    history.forEach(drawRemote);
  }, [history]);

  useEffect(() => {
    const setupCanvas = (
      canvas: HTMLCanvasElement | null,
      ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>
    ) => {
      if (!canvas) return;
      ctxRef.current = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.9;
    };

    setupCanvas(localCanvasRef.current, localCtxRef);
    setupCanvas(remoteCanvasRef.current, remoteCtxRef);

    return () => {
      localCanvasRef.current = null;
      localCtxRef.current = null;
      remoteCanvasRef.current = null;
      remoteCtxRef.current = null;
    };
  }, []);

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

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in event) {
      const touch = event.touches[0];
      const rect = localCanvasRef.current?.getBoundingClientRect();
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
    setDrawing(true);
    const { x, y } = getCoordinates(e);
    setCurrentPoints([{ x, y }]);
    setLastSentPoint({ x, y });

    localCtxRef.current?.beginPath();
    localCtxRef.current?.moveTo(x, y);
  };

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;

    const { x, y } = getCoordinates(event);
    const currentPoint = { x, y };

    localCtxRef.current!.strokeStyle = color;
    localCtxRef.current!.lineWidth = 5;
    localCtxRef.current!.lineCap = "round";
    localCtxRef.current!.lineTo(x, y);
    localCtxRef.current!.stroke();

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
    localCtxRef.current?.closePath();

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

  const drawRemote = (drawData: DrawData) => {
    if (!remoteCtxRef.current) return;

    const { color, points, isLive } = drawData;
    if (!points?.length) return;

    remoteCtxRef.current.strokeStyle = color;
    remoteCtxRef.current.lineWidth = 5;
    remoteCtxRef.current.lineCap = "round";

    remoteCtxRef.current.beginPath();
    remoteCtxRef.current.moveTo(points[0].x, points[0].y);

    for (const point of points.slice(1)) {
      remoteCtxRef.current.lineTo(point.x, point.y);
    }

    remoteCtxRef.current.stroke();
    if (!isLive) {
      remoteCtxRef.current.closePath();
    }
  };

  return (
    <div className="canvas-container" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "gray",
          width: "100%",
          height: "90vh",
        }}
      />
      <canvas
        ref={remoteCanvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          border: "1px solid black",
          background: "transparent",
          touchAction: "none",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={localCanvasRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          border: "1px solid black",
          background: "transparent",
          touchAction: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{ position: "absolute", top: "calc(90vh + 10px)", zIndex: 3 }}
      >
        <button onClick={() => setColor("white")}>🖊️ white</button>
        <button onClick={() => setColor("red")}>🖊️ red</button>
        <button onClick={() => setColor("blue")}>🖊️ blue</button>
        <button onClick={() => setColor("green")}>🖊️ green</button>
      </div>
    </div>
  );
}
