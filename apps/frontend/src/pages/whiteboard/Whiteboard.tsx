import { useSetAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { messagesAtom } from "../../atoms";
import { WhiteboardCanvas } from "./components";
import { Layout } from "../../components";

export const Whiteboard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setMessages = useSetAtom(messagesAtom);

  if (!id) {
    return <div>Invalid whiteboard ID</div>;
  }

  const handleBack = () => {
    setMessages([]);
    navigate("/whiteboard");
  };

  return (
    <Layout>
      <div className="relative w-full h-full">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <WhiteboardCanvas whiteboardId={id} />
      </div>
    </Layout>
  );
};
