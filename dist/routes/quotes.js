"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slicedQuotes = exports.quotesRouter = void 0;
const express_1 = __importDefault(require("express"));
const quoteslist_1 = require("../utils/quoteslist");
const shuffleArray_1 = __importDefault(require("../utils/shuffleArray"));
exports.quotesRouter = express_1.default.Router();
exports.quotesRouter.get('/', (req, res) => {
    let { limit } = req.query;
    let limitNumber = Number(limit) || 1;
    res.json({ quotes: slicedQuotes(limitNumber) });
});
function slicedQuotes(limit = 1) {
    let shuffledQuotes = (0, shuffleArray_1.default)(quoteslist_1.quotes);
    return shuffledQuotes.slice(0, limit);
}
exports.slicedQuotes = slicedQuotes;
