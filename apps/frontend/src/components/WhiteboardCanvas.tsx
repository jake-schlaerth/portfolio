import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../hooks";
import { useAtomValue } from "jotai";
import { messagesAtom, selectedWhiteboardIdAtom } from "../atoms";

interface DrawData {
  color: string;
  // A list of [x, y] points or {x, y} objects
  points: { x: number; y: number }[];
}

export function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const selectedWhiteboardId = useAtomValue(selectedWhiteboardIdAtom);
  const messages = useAtomValue(messagesAtom);

  const { sendMessage } = useWebSocket();

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("black");
  // Track the points for the current stroke
  const [currentPoints, setCurrentPoints] = useState<
    { x: number; y: number }[]
  >([]);

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

  // Listen for incoming "draw" messages and re-draw them
  useEffect(() => {
    messages.forEach((message) => {
      try {
        const data = JSON.parse(message);
        if (
          data.whiteboardId === selectedWhiteboardId &&
          data.type === "draw"
        ) {
          drawOnCanvas(data.payload);
        }
      } catch (error) {
        console.error("Invalid message format:", error);
      }
    });
  }, [messages, selectedWhiteboardId]);

  /**
   * User starts drawing:
   * 1. Begin a new path on the canvas
   * 2. Move to the initial (x, y) point
   * 3. Track that we are in "drawing" mode
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    setDrawing(true);

    // Start collecting points
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentPoints([{ x: offsetX, y: offsetY }]);

    // Initialize a path on the canvas
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(offsetX, offsetY);
  };

  /**
   * As the user moves the mouse:
   * 1. Add each point to the "currentPoints"
   * 2. Draw on the canvas in realtime
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    // Draw the next segment in realtime
    ctxRef.current!.strokeStyle = color;
    ctxRef.current!.lineWidth = 5;
    ctxRef.current!.lineCap = "round";
    ctxRef.current!.lineTo(offsetX, offsetY);
    ctxRef.current!.stroke();

    // Save the point
    setCurrentPoints((prev) => [...prev, { x: offsetX, y: offsetY }]);
  };

  /**
   * User stops drawing:
   * 1. Close the path on the canvas
   * 2. Send the entire set of points (with color) to the server
   */
  const handleMouseUp = () => {
    setDrawing(false);
    ctxRef.current?.closePath();

    // Send the line data (color + full path) to the server
    sendMessage(
      JSON.stringify({
        whiteboardId: selectedWhiteboardId,
        type: "draw",
        payload: {
          color,
          points: currentPoints, // send the entire path
        },
      })
    );

    // Reset for the next line
    setCurrentPoints([]);
  };

  /**
   * Recreate a stroke on our canvas from the given data
   */
  const drawOnCanvas = (data: DrawData) => {
    if (!ctxRef.current) return;

    const { color, points } = data;
    if (!points.length) return;

    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = 5;
    ctxRef.current.lineCap = "round";

    // Begin path from the first point
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(points[0].x, points[0].y);

    // Draw line segments to each subsequent point
    for (let i = 1; i < points.length; i++) {
      ctxRef.current.lineTo(points[i].x, points[i].y);
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
