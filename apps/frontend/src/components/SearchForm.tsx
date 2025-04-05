import { useState } from "react";
import { SearchFormProps } from "../types/search";

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="enter search term"
        className="p-2 border rounded border-gray-700 placeholder-gray-500"
      />
      <button
        type="submit"
        // className="text-lg py-2 px-4 rounded cursor-pointer hover:bg-[#ff6340] disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "searching..." : "search"}
      </button>
    </form>
  );
};
