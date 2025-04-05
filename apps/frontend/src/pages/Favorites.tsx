import { Header } from "../components/Header";
import { SearchResults } from "../components/SearchResults";
import { SearchResult } from "../types/search";

export const Favorites = () => {
  const favoriteResults: SearchResult[] = [
    {
      repositoryName: "example/repo",
      commitMessage: "sample favorite commit",
      commitHash: "abc123",
    },
  ];

  return (
    <div className="text-center p-4 mx-auto">
      <Header />

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-300">
          my favorite results
        </h2>
        <SearchResults
          results={favoriteResults}
          error={null}
          isLoading={false}
        />
      </div>
    </div>
  );
};
