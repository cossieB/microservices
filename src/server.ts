import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import { whoAmIRouter } from "./whoami";
import { timestampRouter } from "./timestamp";
import { shortenerRouter } from "./shortener";
import path from "path";
import { metadataRouter } from "./metadata";
import timezoneHelper from "./timezoneHelper";
import { quotesRouter, slicedQuotes } from "./quotes";
import {emailRouter} from './emailer'

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT)
})