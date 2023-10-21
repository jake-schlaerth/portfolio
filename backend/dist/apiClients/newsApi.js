"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsApiClient = void 0;
class NewsApiClient {
    constructor() {
        this.baseUrl = "https://newsapi.org/v2";
    }
    get apiKey() {
        if (!this._apiKey) {
            this._apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY || "";
        }
        return this._apiKey;
    }
    static getInstance() {
        if (!NewsApiClient.instance) {
            NewsApiClient.instance = new NewsApiClient();
        }
        return NewsApiClient.instance;
    }
    async fetchEverything(query, date, sortBy = "popularity") {
        const url = `${this.baseUrl}/everything?q=${query}&language=en&from=${date}&sortBy=${sortBy}&apiKey=${this.apiKey}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch from NewsAPI: ${response.statusText}`);
        }
        return response.json();
    }
}
exports.NewsApiClient = NewsApiClient;
