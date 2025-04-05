import { useState } from "react";
import { Header } from "../../components/Header";
import { ProjectDescription, SearchForm, SearchResults } from "./components";
import { SearchResult } from "./types/search";
import { Layout } from "../../components";

export const RepoVulgarityAnalysisSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);

    const url = new URL("/commit-analysis/search", "http://localhost:8081");
    url.searchParams.set("profanity", query);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 mx-auto">
        <ProjectDescription />
        <Header />

        <div className="p-8">
          <SearchForm onSearch={handleSearch} />
          <SearchResults
            results={searchResults}
            error={error}
            isLoading={isLoading}
            searchPerformed={searchPerformed}
          />
        </div>
      </div>
    </Layout>
  );
};
