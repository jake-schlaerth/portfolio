import { SearchResultsProps } from "../types";

export const SearchResults = ({
  results,
  error,
  isLoading,
}: SearchResultsProps) => {
  const getRepoPath = (repoUrl: string): string => {
    return repoUrl.replace("https://github.com/", "").replace(".git", "");
  };

  const getRepoName = (repoUrl: string): string => {
    const path = getRepoPath(repoUrl);
    return path.split("/").pop() || "";
  };

  if (error) {
    return <p className="mt-4">{error}</p>;
  }

  if (results.length > 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl mb-4 text-gray-300">search results</h2>
        <ul className="list-none">
          {results.map((result, index) => (
            <li
              key={index}
              className="mb-4 p-4 border rounded text-left border-gray-700"
            >
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-sm tracking-wide">repo</span>
                  <div className="text-gray-300 font-medium">
                    {getRepoName(result.repository)}
                  </div>
                </div>
                <div>
                  <span className=" text-sm tracking-wide">commit message</span>
                  <div>{result.commitMessage}</div>
                </div>
                <a
                  href={`https://github.com/${getRepoPath(
                    result.repository
                  )}/commit/${result.commitHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  // className="text-blue-400 hover:text-blue-300 underline text-sm mt-1"
                >
                  view commit
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!isLoading && !error && results.length === 0) {
    return <p className="mt-4 text-gray-500">no results found</p>;
  }

  return null;
};
