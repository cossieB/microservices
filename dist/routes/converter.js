"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.converterRouter = void 0;
const express_1 = __importDefault(require("express"));
const converter_1 = __importDefault(require("../utils/converter"));
exports.converterRouter = express_1.default.Router();
exports.converterRouter.get('/', (req, res) => {
    const input = req.query.input;
    try {
        const converter = new converter_1.default(input);
        const { initNum, initUnit, returnUnit } = converter;
        const returnNum = converter.convert();
        const string = converter.getString();
        return res.json({ initNum, initUnit, returnNum, returnUnit, string });
    }
    catch (e) {
        return res.send(e.message);
    }
});
