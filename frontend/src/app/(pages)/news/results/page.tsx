"use client";

import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { searchQueryAtom } from "../searchQueryAtom";
import { Article } from "./components/article";
import { ArticleContainer } from "./components/articleContainer";
import { Article as ArticleType } from "../types";

export default function NewsResults() {
  const router = useRouter();
  const searchQuery = useAtomValue(searchQueryAtom);
  const [articles, setArticles] = useState([]);

  const fetchArticles = useCallback(async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const safeSearchQuery = encodeURIComponent(searchQuery);
      const endpoint = `http://${baseUrl}/news?query=${safeSearchQuery}`;

      const response = await fetch(endpoint);

      setArticles(await response.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      router.replace("/news");
      return;
    }

    fetchArticles();
  }, [searchQuery, router]);

  return (
    <>
      <h1 className="text-white mb-4">pick a starting point</h1>

      <ArticleContainer>
        {articles.map((article: ArticleType) => (
          <Article key={article.url} article={article} />
        ))}
      </ArticleContainer>
    </>
  );
}
