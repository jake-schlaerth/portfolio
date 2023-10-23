import { getEnvVar } from "@/config/getEnvVar";
import { NewsApiResponse } from "@/services/newsService/types";

export class NewsApiClient {
  private static instance: NewsApiClient;
  private readonly baseUrl = "https://newsapi.org/v2";
  private _apiKey?: string;

  private constructor() {}

  private get apiKey(): string {
    if (!this._apiKey) {
      this._apiKey = getEnvVar("NEWSAPI_KEY");
    }
    return this._apiKey;
  }

  public static getInstance(): NewsApiClient {
    if (!NewsApiClient.instance) {
      NewsApiClient.instance = new NewsApiClient();
    }
    return NewsApiClient.instance;
  }

  public fetchEverything = async (
    query: string,
    date: string,
    sortBy: string = "popularity"
  ): Promise<NewsApiResponse> => {
    const url = `${this.baseUrl}/everything?q=${query}&language=en&from=${date}&sortBy=${sortBy}&apiKey=${this.apiKey}`;
    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch from NewsAPI: ${response.statusText}`);
    }

    return response.json();
  };

  public fetchHeadlines = async (query: string): Promise<any> => {
    const url = `${this.baseUrl}/v2/top-headlines?q=${query}&country=us&pageSize=100&apiKey=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from NewsAPI: ${response.statusText}`);
    }

    return response.json();
  };
}
