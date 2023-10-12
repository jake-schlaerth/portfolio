"use client";
import { Subtitle } from "@components/Subtitle";
import { Title } from "@components/Title";
import { useEffect, useState } from "react";

export default function NewsApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/");
        const jsonData = await res.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Title>news app</Title>
      <Subtitle>for news</Subtitle>
    </>
  );
}
