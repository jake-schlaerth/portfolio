import { Routes, Route } from "react-router-dom";
import { Code, Music, Home, Whiteboard, WhiteboardList } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/whiteboard" element={<WhiteboardList />} />
      <Route path="/whiteboard/:id" element={<Whiteboard />} />
      <Route path="/code" element={<Code />} />
      <Route path="/music" element={<Music />} />
    </Routes>
  );
}

export default App;
