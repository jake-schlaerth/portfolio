import { Routes, Route } from "react-router-dom";
import { Code, Music, Portfolio, Whiteboard, WhiteboardList } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/whiteboard" element={<WhiteboardList />} />
      <Route path="/whiteboard/:id" element={<Whiteboard />} />
      <Route path="/code" element={<Code />} />
      <Route path="/music" element={<Music />} />
    </Routes>
  );
}

export default App;
