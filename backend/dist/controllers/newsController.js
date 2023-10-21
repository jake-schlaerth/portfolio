"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsController = void 0;
const newsApi_1 = require("@/apiClients/newsApi");
class NewsController {
    constructor() {
        this.apiClient = newsApi_1.NewsApiClient.getInstance();
    }
    async getNews(req, res) {
        try {
            const { query, date, sortBy } = req.query;
            const data = await this.apiClient.fetchEverything(query, date, sortBy);
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch news" });
        }
    }
}
exports.newsController = new NewsController();
