"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const whoami_1 = require("./routes/whoami");
const timestamp_1 = require("./routes/timestamp");
const shortener_1 = require("./routes/shortener");
const metadata_1 = require("./routes/metadata");
const timezoneHelper_1 = __importDefault(require("./utils/timezoneHelper"));
const quotes_1 = require("./routes/quotes");
const emailer_1 = require("./routes/emailer");
const exercise_1 = require("./routes/exercise");
const converter_1 = require("./routes/converter");
const translator_1 = require("./routes/translator");
const issues_1 = require("./routes/issues");
const express_graphql_1 = require("express-graphql");
const query_1 = __importDefault(require("./graphql/query"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Express Middleware
app.set("view engine", "pug");
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: query_1.default,
    graphiql: true
}));
// Home Page
app.get('/', async (req, res) => {
    const whoami = JSON.stringify({ "ipaddress": req.ip, "language": req.headers["accept-language"], "software": req.headers["user-agent"] });
    const timestamp = JSON.stringify((0, timezoneHelper_1.default)());
    const quotes = JSON.stringify({ quotes: (0, quotes_1.slicedQuotes)() });
    res.render('./index.pug', { whoami, timestamp, quotes });
});
// API Routes
app.use('/api/whoami', whoami_1.whoAmIRouter);
app.use('/api/timestamp', timestamp_1.timestampRouter);
app.use('/api/url', shortener_1.shortenerRouter);
app.use('/api/metadata', metadata_1.metadataRouter);
app.use('/api/quotes', quotes_1.quotesRouter);
app.use('/api/email', emailer_1.emailRouter);
app.use('/api/exercisetracker', exercise_1.exerciseRouter);
app.use('/api/converter', converter_1.converterRouter);
app.use('/api/translate', translator_1.translatorRouter);
app.use('/api/issues', issues_1.issueRouter);
app.post('/test', (req, res) => {
    res.json({});
});
const PORT = process.env.PORT || 5000;
(async function () {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log("server is listening on port " + PORT);
        });
    }
    catch (e) {
        console.log(e);
    }
})();
