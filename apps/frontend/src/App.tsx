import { Routes, Route } from "react-router-dom";
import { Code, Music, Home, Whiteboard, WhiteboardList } from "./pages";
import { Search } from "./pages/Search";
import { Favorites } from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/whiteboard" element={<WhiteboardList />} />
      <Route path="/whiteboard/:id" element={<Whiteboard />} />
      <Route path="/code" element={<Code />} />
      <Route path="/music" element={<Music />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
