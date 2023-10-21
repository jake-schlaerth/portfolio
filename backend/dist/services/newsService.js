"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsService = void 0;
const newsApiClient_1 = require("@/apiClients/newsApiClient");
const articleModel_1 = require("@/models/article/articleModel");
class NewsService {
    constructor() {
        this.getSelectedArticle = async (query, sortBy) => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const date = this.getNewsApiFormattedDate(yesterday);
            const data = await this.apiClient.fetchEverything(query, date, sortBy);
            // Save all articles to the database
            for (let article of data.articles) {
                // Check if the article already exists to avoid duplicates
                const existingArticle = await articleModel_1.ArticleModel.findOne({ url: article.url });
                if (!existingArticle) {
                    await articleModel_1.ArticleModel.create(article);
                }
            }
            // Your article selection logic here, for example:
            const randomIndex = Math.floor(Math.random() * data.articles.length);
            return data.articles[randomIndex];
        };
        this.getNewsApiFormattedDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };
        this.apiClient = newsApiClient_1.NewsApiClient.getInstance();
    }
}
exports.newsService = new NewsService();
