import { useAtom } from "jotai";
import { sessionIdAtom } from "./atoms";
import { Whiteboard, Register } from "./components";

function App() {
  const [sessionId] = useAtom(sessionIdAtom);

  return <div>{sessionId ? <Whiteboard /> : <Register />}</div>;
}

export default App;
