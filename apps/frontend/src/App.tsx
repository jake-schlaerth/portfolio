import { Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Code, Music, Home } from "./pages/index";

export const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/code" element={<Code />} />
      <Route path="/music" element={<Music />} />
    </Route>
  </Routes>
);
