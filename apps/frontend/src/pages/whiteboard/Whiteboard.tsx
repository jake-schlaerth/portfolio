import { useSetAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { messagesAtom } from "../../atoms";
import { DeleteWhiteboardModal, WhiteboardCanvas } from "./components";
import { Layout } from "../../components";
import { useState } from "react";

export const Whiteboard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setMessages = useSetAtom(messagesAtom);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!id) {
    return <div>Invalid whiteboard ID</div>;
  }

  const handleBack = () => {
    setMessages([]);
    navigate("/whiteboard");
  };

  const handleDelete = async () => {
    const url = new URL(
      `/whiteboard/${id}`,
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
      setMessages([]);
      navigate("/whiteboard");
    } catch (error) {
      console.error("Failed to delete whiteboard:", error);
    }
  };

  return (
    <Layout>
      <div className="relative w-full h-[calc(100vh-8rem)]">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => setDeleteModalOpen(true)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-red-500 hover:text-red-600"
          aria-label="Delete whiteboard"
        >
          🗑️
        </button>
        <WhiteboardCanvas whiteboardId={id} />
      </div>
      <DeleteWhiteboardModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </Layout>
  );
};
