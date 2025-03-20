import { useAtomValue } from "jotai";
import { messagesAtom } from "../../atoms";
import { WhiteboardCanvas } from "../whiteboardCanvas/WhiteboardCanvas";

export function Whiteboard() {
  const messages = useAtomValue(messagesAtom);

  return (
    <div>
      <WhiteboardCanvas />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
