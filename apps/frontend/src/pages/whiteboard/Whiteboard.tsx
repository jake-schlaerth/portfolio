import { useAtom, useAtomValue } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { messagesAtom } from "../../atoms";
import { WhiteboardCanvas } from "../whiteboardCanvas";
import { Layout } from "../../components";

export const Whiteboard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useAtom(messagesAtom);

  if (!id) {
    return <div>Invalid whiteboard ID</div>;
  }

  const handleBack = () => {
    setMessages([]);
    navigate("/whiteboard");
  };

  return (
    <Layout>
      <button onClick={handleBack}>← back to whiteboards</button>
      <WhiteboardCanvas whiteboardId={id} />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </Layout>
  );
};
