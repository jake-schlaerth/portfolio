import { useAtom, useAtomValue } from "jotai";
import { selectedWhiteboardIdAtom, sessionIdAtom } from "./atoms";
import { Whiteboard, Register } from "./components";
import { WhiteboardList } from "./components/WhiteboardList";

function App() {
  const [sessionId] = useAtom(sessionIdAtom);
  const selectedWhiteboardId = useAtomValue(selectedWhiteboardIdAtom);

  if (!sessionId) {
    return <Register />;
  }

  if (!selectedWhiteboardId) {
    return <WhiteboardList />;
  }

  return <Whiteboard />;
}

export default App;
