import { Layout } from "../../components";
import { Header } from "../../components/Header";
import { SearchResult } from "../repoVulgarityAnalysisSearch/types";

export const RepoVulgarityAnalysisCuratedResults = () => {
  const favoriteResults: SearchResult[] = [
    {
      repository: "example/repo",
      commitMessage: "sample favorite commit",
      commitHash: "abc123",
    },
  ];

  return (
    <Layout>
      <div className="text-center p-4 mx-auto">
        <Header />
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-300">
            my favorite results
          </h2>

          <p>example</p>
        </div>
      </div>
    </Layout>
  );
};
