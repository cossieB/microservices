"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.timestampRouter = express_1.default.Router();
exports.timestampRouter.get('/:date?', (req, res) => {
    let { date } = req.params;
    let newDate;
    date ? newDate = new Date(date) : newDate = new Date();
    if (Number(date)) {
        let UTC = new Date(Number(date));
        res.json({ "unix": date, "utc": UTC.toUTCString() });
    }
    else if (newDate.toString() != "Invalid Date") {
        res.json({ "unix": newDate.getTime(), "utc": newDate.toUTCString() });
    }
    else {
        res.json({ "error": "Invalid Date" });
    }
});
