import { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedWhiteboardIdAtom, sessionIdAtom } from "../atoms";

interface WhiteboardSummary {
  id: string;
  name: string;
}

export function WhiteboardList() {
  const sessionId = useAtomValue(sessionIdAtom);
  const setSelectedWhiteboardId = useSetAtom(selectedWhiteboardIdAtom);
  const [whiteboards, setWhiteboards] = useState<WhiteboardSummary[]>([]);
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchWhiteboards = async () => {
      try {
        const url = new URL(
          "/whiteboard",
          import.meta.env.VITE_BACKEND_BASE_URL
        );
        url.searchParams.append("limit", limit.toString());
        url.searchParams.append("offset", (page * limit).toString());
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: WhiteboardSummary[] = await response.json();
        setWhiteboards(data);
      } catch (error) {
        console.error("Failed to fetch whiteboards:", error);
      }
    };

    if (sessionId) {
      fetchWhiteboards();
    }
  }, [sessionId, page]);

  return (
    <div>
      <h2>Select a Whiteboard</h2>
      <ul>
        {whiteboards.map((whiteboard) => (
          <li key={whiteboard.id}>
            <button onClick={() => setSelectedWhiteboardId(whiteboard.id)}>
              {whiteboard.name}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
