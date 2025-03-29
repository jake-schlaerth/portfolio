import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { messagesAtom, webSocketAtom } from "../../../atoms";

export function useWebSocket(whiteboardId: string) {
  const setMessages = useSetAtom(messagesAtom);
  const [webSocket, setWebSocket] = useAtom(webSocketAtom);

  useEffect(() => {
    if (!whiteboardId) return;

    const url = new URL("/web_socket", import.meta.env.VITE_BACKEND_BASE_URL);
    url.protocol = "ws:";
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
