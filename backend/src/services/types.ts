import type { Request } from "express";
import { Article } from "@/models/article/types";

interface NewsRequestQuery {
  query: string;
  date: string;
  sortBy?: string;
}

type RequestDictionary = {};
type RequestBody = {};

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type NewsRequest = Request<
  RequestDictionary,
  NewsApiResponse,
  RequestBody,
  NewsRequestQuery
>;
