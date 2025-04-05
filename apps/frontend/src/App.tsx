import { Routes, Route } from "react-router-dom";
import { Code, Music, Home, Whiteboard, WhiteboardList } from "./pages";
import {
  RepoVulgarityAnalysisSearch,
  RepoVulgarityAnalysisCuratedResults,
} from "./pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/whiteboard" element={<WhiteboardList />} />
      <Route path="/whiteboard/:id" element={<Whiteboard />} />
      <Route path="/code" element={<Code />} />
      <Route path="/music" element={<Music />} />
      <Route
        path="/repo-vulgarity-analysis/search"
        element={<RepoVulgarityAnalysisSearch />}
      />
      <Route
        path="/repo-vulgarity-analysis/curated-results"
        element={<RepoVulgarityAnalysisCuratedResults />}
      />
    </Routes>
  );
}

export default App;
