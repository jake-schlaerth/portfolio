import mongoose, { Schema } from "mongoose";

import { Article } from "./articleType";

const SourceSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
});

const ArticleSchema = new Schema({
  source: { type: SourceSchema, required: true },
  author: { type: String },
  title: { type: String, required: true },
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String,
});

export const ArticleModel = mongoose.model<Article>("Article", ArticleSchema);
