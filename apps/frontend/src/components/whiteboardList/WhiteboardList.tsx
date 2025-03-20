import { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedWhiteboardIdAtom } from "../../atoms";

interface WhiteboardSummary {
  id: string;
  name: string;
}

export function WhiteboardList() {
  const setSelectedWhiteboardId = useSetAtom(selectedWhiteboardIdAtom);
  const [whiteboards, setWhiteboards] = useState<WhiteboardSummary[]>([]);
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const limit = 10;

  const openCreateWhiteboardModal = () => {
    setSelectedWhiteboardId(null);
    setModalOpen(true);
  };

  const handleCreateWhiteboard = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const whiteboardName = formData.get("name");

    const url = new URL("/whiteboard", import.meta.env.VITE_BACKEND_BASE_URL);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: whiteboardName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setModalOpen(false);
      // refresh the list of whiteboards
      await fetchWhiteboards();
    } catch (error) {
      console.error("Failed to create whiteboard:", error);
    }
  };

  const fetchWhiteboards = async () => {
    try {
      const url = new URL("/whiteboard", import.meta.env.VITE_BACKEND_BASE_URL);
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

  useEffect(() => {
    fetchWhiteboards();
  }, [page]);

  return (
    <div>
      {modalOpen ? (
        <div>
          <h2>Create a Whiteboard</h2>
          <form onSubmit={handleCreateWhiteboard}>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <button type="submit">Create</button>
          </form>
        </div>
      ) : (
        <button onClick={openCreateWhiteboardModal}>+</button>
      )}
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
