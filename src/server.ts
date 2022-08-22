import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import { whoAmIRouter } from "./routes/whoami";
import { timestampRouter } from "./routes/timestamp";
import { shortenerRouter } from "./routes/shortener";
import path from "path";
import { metadataRouter } from "./routes/metadata";
import timezoneHelper from "./utils/timezoneHelper";
import { quotesRouter, slicedQuotes } from "./routes/quotes";
import {emailRouter} from './routes/emailer'
import { exerciseRouter } from "./routes/exercise";
import mongoose from "mongoose";
import { converterRouter } from "./routes/converter";
import { translatorRouter } from "./routes/translator";
import { issueRouter } from "./routes/issues";

dotenv.config()
const app = express()

// Express Middleware
app.set("view engine", "pug")
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../public')))

// Home Page
app.get('/', async (req, res) => {
    const whoami = JSON.stringify({"ipaddress": req.ip, "language": req.headers["accept-language"], "software": req.headers["user-agent"]})
    const timestamp = JSON.stringify(timezoneHelper())
    const quotes = JSON.stringify({quotes: slicedQuotes()})
    res.render('./index.pug', {whoami, timestamp, quotes})
})

// API Routes
app.use('/api/whoami', whoAmIRouter)
app.use('/api/timestamp', timestampRouter)
app.use('/api/url', shortenerRouter)
app.use('/api/metadata', metadataRouter)
app.use('/api/quotes', quotesRouter)
app.use('/api/email', emailRouter)
app.use('/api/exercisetracker', exerciseRouter)
app.use('/api/converter', converterRouter)
app.use('/api/translate', translatorRouter)
app.use('/api/issues', issueRouter);
app.post('/test', (req, res) => {
    res.json({})
})

const PORT = process.env.PORT || 5000;

(async function() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        app.listen(PORT, () => {
            console.log("server is listening on port " + PORT)
        })
    }
    catch(e: any) {
        console.log(e)
    }
})()