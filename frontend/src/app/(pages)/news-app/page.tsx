"use client";
import { Subtitle } from "@components/Subtitle";
import { Title } from "@components/Title";
import { useEffect, useState } from "react";

export default function NewsApp() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const endpoint = `http://localhost:3001/news?query=${encodeURIComponent(
        query
      )}`;
      const res = await fetch(endpoint);
      const jsonData = await res.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <>
      <Title>news app</Title>
      <Subtitle>for news</Subtitle>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for news..."
      />
      <button onClick={fetchData}>Search</button>
    </>
  );
}
