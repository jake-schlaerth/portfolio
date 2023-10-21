import { NewsApiClient } from "@/apiClients/newsApiClient";
import type { NewsApiResponse } from "./types";
import { ArticleModel } from "@/models/article/articleModel";

class NewsService {
  private apiClient: NewsApiClient;

  constructor() {
    this.apiClient = NewsApiClient.getInstance();
  }

  getSelectedArticle = async (
    query: string,
    sortBy?: string
  ): Promise<NewsApiResponse> => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const date = this.getNewsApiFormattedDate(yesterday);

    const data = await this.apiClient.fetchEverything(query, date, sortBy);

    // Save all articles to the database
    for (let article of data.articles) {
      // Check if the article already exists to avoid duplicates
      const existingArticle = await ArticleModel.findOne({ url: article.url });
      if (!existingArticle) {
        await ArticleModel.create(article);
      }
    }

    // Your article selection logic here, for example:
    const randomIndex = Math.floor(Math.random() * data.articles.length);
    return data.articles[randomIndex];
  };

  getNewsApiFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
}

export const newsService = new NewsService();
