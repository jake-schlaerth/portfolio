import { Layout } from "../../components";
import { Header } from "../../components/Header";
import { SearchResults } from "../repoVulgarityAnalysisSearch/components";
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
          <ul className="list-none">
            <li className="mb-4 p-4 border rounded text-left border-gray-700">
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-gray-400 tracking-wide">repo</span>
                  <div>supabase/supabase</div>
                </div>
                <div>
                  <span className="text-gray-400 tracking-wide">
                    commit message
                  </span>
                  <div>
                    OK, this is some very shitty code, but i need these charts
                    for the pitch deck. Pushing now to clean up later
                  </div>
                </div>
                <a
                  href="https://github.com/supabase/supabase/commit/0d6279679d47f2d826ea352c859cf0ef36892379"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  view commit
                </a>
                <div>
                  <span className="text-gray-400 tracking-wide">
                    commentary
                  </span>
                  <div>
                    this code rules because it was written by the ceo of
                    supabase and it closely resembles the code i wrote for this
                    project. it also admits its faults and expresses an intent
                    to fix and remove the shitty code later. which i have not
                    done and don't intend to do. but he's just like me frfr.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};
