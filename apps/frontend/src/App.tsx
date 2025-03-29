import { Routes, Route } from "react-router-dom";
import { Whiteboard, WhiteboardList } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WhiteboardList />} />
      <Route path="/whiteboard/:id" element={<Whiteboard />} />
    </Routes>
  );
}

export default App;
