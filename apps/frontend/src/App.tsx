import { Routes, Route } from "react-router-dom";
import { Code, Music, Portfolio, Whiteboard, WhiteboardList } from "./pages";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/whiteboard" element={<WhiteboardList />} />
          <Route path="/whiteboard/:id" element={<Whiteboard />} />
          <Route path="/code" element={<Code />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
