import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { messagesAtom, selectedWhiteboardIdAtom } from "../../atoms";
import { useWebSocket, useWhiteboardHistory } from "./hooks";

interface DrawData {
  color: string;
  points: { x: number; y: number }[];
  isLive?: boolean;
}

export function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const messages = useAtomValue(messagesAtom);
  const selectedWhiteboardId = useAtomValue(selectedWhiteboardIdAtom);
  const history = useWhiteboardHistory(selectedWhiteboardId);
  const { sendMessage } = useWebSocket();
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentPoints([{ x: offsetX, y: offsetY }]);
    setLastSentPoint({ x: offsetX, y: offsetY });

    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!drawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    const currentPoint = { x: offsetX, y: offsetY };

    ctxRef.current!.strokeStyle = color;
    ctxRef.current!.lineWidth = 5;
    ctxRef.current!.lineCap = "round";
    ctxRef.current!.lineTo(offsetX, offsetY);
    ctxRef.current!.stroke();

    setCurrentPoints((prev) => [...prev, currentPoint]);

    if (
      lastSentPoint &&
      (Math.abs(currentPoint.x - lastSentPoint.x) > 5 ||
        Math.abs(currentPoint.y - lastSentPoint.y) > 5)
    ) {
      sendMessage(
        JSON.stringify({
          whiteboardId: selectedWhiteboardId,
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

  const handleMouseUp = () => {
    setDrawing(false);
    ctxRef.current?.closePath();

    sendMessage(
      JSON.stringify({
        whiteboardId: selectedWhiteboardId,
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid black", background: "gray" }}
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
