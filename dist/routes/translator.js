"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translatorRouter = void 0;
const express_1 = require("express");
const translator_1 = __importDefault(require("../utils/translator"));
exports.translatorRouter = (0, express_1.Router)();
exports.translatorRouter.post('/', (req, res) => {
    const { text, locale } = req.body;
    if (text == undefined || locale == undefined)
        return res.json({ error: 'Required field(s) missing' });
    if (text == '')
        return res.json({ error: 'No text to translate' });
    if (locale != 'american-to-british' && locale != 'british-to-american')
        return res.json({ error: 'Invalid value for locale field' });
    const translator = new translator_1.default(text, locale);
    const translation = translator.highlight();
    return res.json({ text, translation });
});
