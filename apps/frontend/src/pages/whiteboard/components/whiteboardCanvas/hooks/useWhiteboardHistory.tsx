import { useEffect, useState } from "react";

export const useWhiteboardHistory = (whiteboardId: string) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!whiteboardId) return;

    const fetchHistory = async () => {
      try {
        const url = new URL(
          `/whiteboard/${whiteboardId}/history`,
          import.meta.env.VITE_WHITEBOARD_BACKEND_BASE_URL
        );

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const history = await response.json();

        setHistory(history);
      } catch (err: any) {
        console.error("Failed to fetch history:", err);
      }
    };

    fetchHistory();
  }, [whiteboardId]);

  return history;
};
