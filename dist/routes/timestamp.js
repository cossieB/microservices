"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampRouter = exports.timezones = void 0;
const express_1 = __importDefault(require("express"));
exports.timezones = [
    'Africa/Johannesburg',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Australia/Sydney',
    'America/Toronto',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'America/Sao_Paulo',
    'Africa/Lagos'
];
exports.timestampRouter = express_1.default.Router();
exports.timestampRouter.get('/:date?', (req, res) => {
    let { date } = req.params;
    let newDate;
    if (!date) {
        newDate = new Date();
    }
    else {
        if (Number(date)) {
            newDate = new Date(Number(date));
        }
        else if (new Date(date).toString() != "Invalid Date") {
            newDate = new Date(date);
        }
        else
            return res.status(400).json({ error: "Invalid Date" });
    }
    let obj = {};
    // Transform each timezone in the timezones array into just the name of the city and make the resulting names keys in the response json.
    for (let zone of exports.timezones) {
        let key;
        let match = zone.match(/(?<=\/)\w+/); // matches all alphanumeric characters that are preceded by "/"
        if (match) {
            key = String(match);
            obj[key] = newDate.toLocaleString('en-za', { timeZone: zone });
        }
    }
    res.json({ "unix": newDate.getTime(), "utc": newDate.toUTCString(), ...obj });
});
