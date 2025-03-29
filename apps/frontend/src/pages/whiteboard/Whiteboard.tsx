import { useAtomValue } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { messagesAtom } from "../../atoms";
import { WhiteboardCanvas } from "../whiteboardCanvas";

export function Whiteboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messages = useAtomValue(messagesAtom);

  if (!id) {
    return <div>Invalid whiteboard ID</div>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>← Back to Whiteboards</button>
      <WhiteboardCanvas whiteboardId={id} />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
