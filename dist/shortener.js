"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenerRouter = void 0;
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./connectDB"));
const urlSchema_1 = require("./urlSchema");
const dns_1 = __importDefault(require("dns"));
const whatwg_url_1 = __importDefault(require("whatwg-url"));
const dnsPromise = dns_1.default.promises;
exports.shortenerRouter = express_1.default.Router();
exports.shortenerRouter.post('/', async (req, res) => {
    const { original } = req.body;
    await (0, connectDB_1.default)();
    let doc = await urlSchema_1.URLModel.findOne({ original });
    if (doc) {
        return res.json(doc);
    }
    let q;
    // Check if given URL is valid. If not throw exception
    try {
        q = new whatwg_url_1.default.URL(original);
        await dnsPromise.lookup(q.hostname);
    }
    catch (e) {
        console.log(e);
        return res.json({ error: "Invalid URL" });
    }
    const allUrls = await urlSchema_1.URLModel.find();
    let short = `/api/url/${allUrls.length + 1}`;
    let url = new urlSchema_1.URLModel({ original, short });
    await url.save();
    res.status(201).json({ original, short });
});
exports.shortenerRouter.get('/:num', async (req, res) => {
    const { num } = req.params;
    await (0, connectDB_1.default)();
    let doc = await urlSchema_1.URLModel.findOne({ short: '/api/url/' + num });
    if (doc) {
        return res.redirect(doc.original);
    }
    else {
        return res.status(404).json({ error: "No url found" });
    }
});
