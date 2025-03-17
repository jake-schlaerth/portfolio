import { useAtomValue } from "jotai";
import { messagesAtom, sessionIdAtom } from "../atoms";
import { useWebSocket } from "../hooks";
import { WhiteboardCanvas } from "./WhiteboardCanvas";

export function Whiteboard() {
  const messages = useAtomValue(messagesAtom);
  const sessionId = useAtomValue(sessionIdAtom);
  const { sendMessage } = useWebSocket();

  return (
    <div>
      <WhiteboardCanvas />
      <button onClick={() => sendMessage(`Hello from ${sessionId}`)}>
        Send Message
      </button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
