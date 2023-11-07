import { Article as ArticleType } from "../../types";

interface ArticleProps {
  article: ArticleType;
}

export const Article = ({ article }: ArticleProps) => (
  <div className="w-1/4 bg-gray-800 p-4 border border-gray-700 rounded">
    <h2 className="text-xl font-bold mb-2 text-white">{article.title}</h2>
    <p className="text-gray-300">{article.description}</p>
  </div>
);
