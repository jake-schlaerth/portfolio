"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";

import { searchQueryAtom } from "./searchQueryAtom";

export default function NewsApp() {
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const router = useRouter();

  const handleClick = () => {
    if (!error) {
      setSearchQuery(searchQuery);
      router.push("news/results");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.includes(" ")) {
      setError(true);
    } else {
      setError(false);
    }

    setSearchQuery(inputValue);
  };

  return (
    <>
      <div>
        <input
          type="text"
          id="singleWordInput"
          placeholder="enter a topic"
          className="bg-gray-900"
          value={searchQuery}
          onFocus={() => setError(false)}
          onChange={handleChange}
        />
        {error && <p className="text-red-500">one word please</p>}
      </div>

      <button onClick={handleClick} disabled={error}>
        start
      </button>
    </>
  );
}
