import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { messagesAtom, webSocketAtom } from "../../../../../atoms";

export function useWebSocket(whiteboardId: string) {
  const setMessages = useSetAtom(messagesAtom);
  const [webSocket, setWebSocket] = useAtom(webSocketAtom);

  useEffect(() => {
    if (!whiteboardId) return;

    // Remove the '/api' prefix for WebSocket URL if it exists
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL.replace("/api", "");
    const url = new URL("/web_socket", baseUrl);
    // Use wss: for HTTPS connections and ws: for HTTP
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.searchParams.set("id", whiteboardId);
    const socket = new WebSocket(url);

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => setMessages((prev) => [...prev, event.data]);
    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket closed");

    setWebSocket(socket);

    return () => {
      socket.close();
      setWebSocket(null);
    };
  }, [whiteboardId]);

  return { sendMessage: (message: string) => webSocket?.send(message) };
}
