import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "../../components";
import {
  CreateWhiteboardModal,
  DeleteWhiteboardModal,
  ProjectDescription,
} from "./components";

interface WhiteboardResponse {
  whiteboards: WhiteboardSummary[];
  total_count: number;
}

interface WhiteboardSummary {
  id: string;
  name: string;
}

export const WhiteboardList = () => {
  const navigate = useNavigate();
  const [whiteboards, setWhiteboards] = useState<WhiteboardSummary[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedWhiteboard, setSelectedWhiteboard] =
    useState<WhiteboardSummary | null>(null);
  const limit = 10;

  const openCreateWhiteboardModal = () => {
    setCreateModalOpen(true);
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
      setCreateModalOpen(false);
      // Navigate to the new whiteboard
      navigate(`/whiteboard/${data.id}`);
      // refresh the list of whiteboards
      await fetchWhiteboards();
    } catch (error) {
      console.error("Failed to create whiteboard:", error);
    }
  };

  const handleDeleteClick = (
    e: React.MouseEvent,
    whiteboard: WhiteboardSummary
  ) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    setSelectedWhiteboard(whiteboard);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedWhiteboard) return;

    const url = new URL(
      `/whiteboard/${selectedWhiteboard.id}`,
      import.meta.env.VITE_BACKEND_BASE_URL
    );
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setDeleteModalOpen(false);
      setSelectedWhiteboard(null);
      await fetchWhiteboards();
    } catch (error) {
      console.error("Failed to delete whiteboard:", error);
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

      const data: WhiteboardResponse = await response.json();
      setWhiteboards(data.whiteboards);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Failed to fetch whiteboards:", error);
    }
  };

  useEffect(() => {
    fetchWhiteboards();
  }, [page]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <ProjectDescription />
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">select a whiteboard</h2>
          <button
            onClick={openCreateWhiteboardModal}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            create new whiteboard
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {whiteboards.map((whiteboard) => (
            <div key={whiteboard.id} className="relative group">
              <Link
                to={`/whiteboard/${whiteboard.id}`}
                className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors block"
              >
                {whiteboard.name}
              </Link>
              <button
                onClick={(e) => handleDeleteClick(e, whiteboard)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete whiteboard"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 text-sm font-medium bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            previous
          </button>
          <button
            disabled={page === Math.ceil(totalCount / limit) - 1}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 text-sm font-medium bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            next
          </button>
        </div>
      </div>
      <CreateWhiteboardModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateWhiteboard}
      />
      {selectedWhiteboard && (
        <DeleteWhiteboardModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedWhiteboard(null);
          }}
          onConfirm={handleDeleteConfirm}
          whiteboardName={selectedWhiteboard.name}
        />
      )}
    </Layout>
  );
};
