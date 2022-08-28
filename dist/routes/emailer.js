"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const express_1 = __importDefault(require("express"));
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mailgun = new mailgun_js_1.default(form_data_1.default);
const MAILGUN_KEY = process.env['MAILGUN_KEY'];
const mg = mailgun.client({ username: 'api', key: MAILGUN_KEY || 'key-yourkeyhere' });
const PUBKEY = process.env['MAILGUN_PUBKEY'];
exports.emailRouter = express_1.default.Router();
const DOMAIN = 'sandboxab001f3c9ee145d6a145546df2d5338f.mailgun.org';
exports.emailRouter.post('/', async (req, res) => {
    const { name, company, email, msg } = req.body;
    const data = {
        from: 'Cossie Bot <postmaster@sandboxab001f3c9ee145d6a145546df2d5338f.mailgun.org>',
        to: process.env.EMAIL,
        subject: `${name} - ${company}`,
        html: `<div style="text-align: center"><h1>${company}</h1><h2>${name}</h2><h2>${email}</h2><p>${msg}</p></div>`
    };
    try {
        await mg.messages.create(DOMAIN, data);
        res.status(201).json({ status: "success" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
});
