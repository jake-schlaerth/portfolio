import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components";
import { CreateWhiteboardModal } from "./components";

interface WhiteboardSummary {
  id: string;
  name: string;
}

export const WhiteboardList = () => {
  const navigate = useNavigate();
  const [whiteboards, setWhiteboards] = useState<WhiteboardSummary[]>([]);
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const limit = 10;

  const openCreateWhiteboardModal = () => {
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

      const data = await response.json();
      setModalOpen(false);
      // Navigate to the new whiteboard
      navigate(`/whiteboard/${data.id}`);
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
    <Layout>
      <CreateWhiteboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateWhiteboard}
      />
      <button onClick={openCreateWhiteboardModal}>+</button>
      <h2>select a whiteboard</h2>
      <ul>
        {whiteboards.map((whiteboard) => (
          <li key={whiteboard.id}>
            <button onClick={() => navigate(`/whiteboard/${whiteboard.id}`)}>
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
    </Layout>
  );
};
