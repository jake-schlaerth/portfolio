export interface SearchResult {
  repository: string;
  commitMessage: string;
  commitHash: string;
}

export interface SearchFormProps {
  onSearch: (query: string) => void;
}

export interface SearchResultsProps {
  results: SearchResult[];
  error: string | null;
  isLoading: boolean;
  searchPerformed?: boolean;
}
