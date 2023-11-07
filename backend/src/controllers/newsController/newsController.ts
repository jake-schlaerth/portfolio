import { Request, Response } from "express";
import { newsService } from "@/services/newsService/newsService";

class NewsController {
  getNews = async (request: Request, response: Response): Promise<void> => {
    try {
      const { query } = request.query;

      const articles = await newsService.getArticles(query as string);
      response.json(articles);
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to fetch news" });
    }
  };
}

export const newsController = new NewsController();
