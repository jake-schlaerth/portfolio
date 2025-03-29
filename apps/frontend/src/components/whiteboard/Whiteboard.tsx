import { useAtomValue } from "jotai";
import { useParams } from "react-router-dom";
import { messagesAtom } from "../../atoms";
import { WhiteboardCanvas } from "../whiteboardCanvas/WhiteboardCanvas";

export function Whiteboard() {
  const { id } = useParams<{ id: string }>();
  const messages = useAtomValue(messagesAtom);

  if (!id) {
    return <div>Invalid whiteboard ID</div>;
  }

  return (
    <div>
      <WhiteboardCanvas whiteboardId={id} />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
