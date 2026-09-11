import { Routes, Route } from "react-router-dom";
import { Code, Music, Home } from "./pages/index";

export const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/code" element={<Code />} />
    <Route path="/music" element={<Music />} />
  </Routes>
);
