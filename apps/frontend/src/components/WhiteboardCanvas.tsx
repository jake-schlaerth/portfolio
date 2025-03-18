import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../hooks";
import { useAtomValue } from "jotai";
import { messagesAtom, selectedWhiteboardIdAtom } from "../atoms";

interface DrawData {
  color: string;
  points: { x: number; y: number }[];
}

export function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const messages = useAtomValue(messagesAtom);
  const selectedWhiteboardId = useAtomValue(selectedWhiteboardIdAtom);
  const { sendMessage } = useWebSocket();
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [history, setHistory] = useState<DrawData[]>([]);
  const [currentPoints, setCurrentPoints] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const url = new URL(import.meta.env.VITE_BACKEND_BASE_URL);
      url.pathname = `/whiteboard/${selectedWhiteboardId}/history`;
      const response = await fetch(url);
      const historyResponse = await response.json();

      setHistory(
        historyResponse.map((whiteboardEvent: any) => whiteboardEvent.payload)
      );
    };

    try {
      fetchHistory();
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  }, [selectedWhiteboardId]);

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
  }, [messages, selectedWhiteboardId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDrawing(true);

    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentPoints([{ x: offsetX, y: offsetY }]);

    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    ctxRef.current!.strokeStyle = color;
    ctxRef.current!.lineWidth = 5;
    ctxRef.current!.lineCap = "round";
    ctxRef.current!.lineTo(offsetX, offsetY);
    ctxRef.current!.stroke();

    setCurrentPoints((prev) => [...prev, { x: offsetX, y: offsetY }]);
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
        },
      })
    );

    setCurrentPoints([]);
  };

  const drawOnCanvas = (drawData: DrawData) => {
    if (!ctxRef.current) return;

    const { color, points } = drawData;
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
    ctxRef.current.closePath();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid black", background: "white" }}
      />
      <div>
        <button onClick={() => setColor("black")}>🖊️ Black</button>
        <button onClick={() => setColor("red")}>🖊️ Red</button>
        <button onClick={() => setColor("blue")}>🖊️ Blue</button>
        <button onClick={() => setColor("green")}>🖊️ Green</button>
      </div>
    </div>
  );
}
