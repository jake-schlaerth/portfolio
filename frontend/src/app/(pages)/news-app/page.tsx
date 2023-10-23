"use client";
import { useEffect, useState } from "react";

export default function NewsApp() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const endpoint = `http://localhost:3001/news?query=${encodeURIComponent(
        query
      )}`;

      if (!error) {
        const res = await fetch(endpoint);
        const jsonData = await res.json();
        console.log(jsonData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.includes(" ")) {
      setError(true);
    } else {
      setError(false);
      setQuery(inputValue);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          id="singleWordInput"
          placeholder="Enter a word"
          value={query}
          onFocus={() => setError(false)}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>one word please</p>}
      </div>

      <button onClick={fetchData} disabled={error}>
        start
      </button>
    </>
  );
}
