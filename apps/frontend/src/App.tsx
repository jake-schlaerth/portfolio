import { Routes, Route } from "react-router-dom";
import {
  Code,
  Music,
  Home,
  Whiteboard,
  WhiteboardList,
  RepoVulgarityAnalysisSearch,
  RepoVulgarityAnalysisCuratedResults,
  VFXRendererPage,
} from "./pages/index";

export const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/whiteboard" element={<WhiteboardList />} />
    <Route path="/whiteboard/:id" element={<Whiteboard />} />
    <Route path="/code" element={<Code />} />
    <Route path="/music" element={<Music />} />
    {/* <Route
      path="/repo-vulgarity-analysis/search"
      element={<RepoVulgarityAnalysisSearch />}
    />
    <Route
      path="/repo-vulgarity-analysis/curated-results"
      element={<RepoVulgarityAnalysisCuratedResults />}
    /> */}
    <Route path="/vfx-renderer" element={<VFXRendererPage />} />
  </Routes>
);
