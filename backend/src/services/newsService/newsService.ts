import { NewsApiClient } from "@/apiClients/newsApiClient";
import { ArticleModel } from "@/models/article/articleModel";
import { Article } from "@/models/article/articleType";

class NewsService {
  private apiClient: NewsApiClient;

  constructor() {
    this.apiClient = NewsApiClient.getInstance();
  }

  getArticles = async (query: string, sortBy?: string): Promise<Article[]> => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const date = this.getNewsApiFormattedDate(yesterday);

    const articlesFromDb = await ArticleModel.find({
      title: new RegExp(query, "i"),
    });

    if (articlesFromDb && articlesFromDb.length > 0) {
      return this.selectRandomArticles(articlesFromDb, 3);
    }

    const data = await this.apiClient.fetchEverything(query, date, sortBy);

    for (let article of data.articles) {
      const existingArticle = await ArticleModel.findOne({ url: article.url });
      if (!existingArticle) {
        await ArticleModel.create(article);
      }
    }

    return this.selectRandomArticles(data.articles, 3);
  };

  selectRandomArticles = (articles: Article[], count: number): Article[] => {
    const shuffled = articles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  getNewsApiFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
}

export const newsService = new NewsService();
