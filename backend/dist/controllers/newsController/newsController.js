"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsController = void 0;
const newsService_1 = require("@/services/newsService");
class NewsController {
    constructor() {
        this.getNews = async (request, response) => {
            try {
                const { query } = request.query;
                const article = await newsService_1.newsService.getSelectedArticle(query);
                response.json(article);
            }
            catch (error) {
                console.log(error);
                response.status(500).json({ error: "Failed to fetch news" });
            }
        };
    }
}
exports.newsController = new NewsController();
