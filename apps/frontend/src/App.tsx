import { useAtomValue } from "jotai";
import { selectedWhiteboardIdAtom } from "./atoms";
import { Whiteboard, WhiteboardList } from "./components";

function App() {
  const selectedWhiteboardId = useAtomValue(selectedWhiteboardIdAtom);

  if (!selectedWhiteboardId) {
    return <WhiteboardList />;
  }

  return <Whiteboard />;
}

export default App;
