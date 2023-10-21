"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsController_1 = require("@/controllers/newsController/newsController");
const router = express_1.default.Router();
router.get("/news", newsController_1.newsController.getNews);
exports.default = router;
