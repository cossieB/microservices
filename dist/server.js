"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const whoami_1 = require("./whoami");
const timestamp_1 = require("./timestamp");
const shortener_1 = require("./shortener");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Express Middleware
app.set("view engine", "pug");
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '../public'));
// Home Page
app.get('/', (req, res) => {
    console.log(__dirname);
    const whoami = JSON.stringify({ "ipaddress": req.ip, "language": req.headers["accept-language"], "software": req.headers["user-agent"] });
    const timestamp = JSON.stringify({ unix: new Date().getTime(), utc: new Date().toUTCString() });
    res.render('./index.pug', { whoami, timestamp });
});
// API Routes
app.use('/api/whoami', whoami_1.whoAmIRouter);
app.use('/api/timestamp', timestamp_1.timestampRouter);
app.use('/api/url', shortener_1.shortenerRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
});
