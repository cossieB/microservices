import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import { whoAmIRouter } from "./whoami";
import { timestampRouter } from "./timestamp";
import { shortenerRouter } from "./shortener";
import path from "path";

dotenv.config()
const app = express()

// Express Middleware
app.set("view engine", "pug")
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, '../public')))

// Home Page
app.get('/', (req, res) => {
    const whoami = JSON.stringify({"ipaddress": req.ip, "language": req.headers["accept-language"], "software": req.headers["user-agent"]})
    const timestamp = JSON.stringify({unix: new Date().getTime(), utc: new Date().toUTCString()})
    res.render('./index.pug', {whoami, timestamp})
})

// API Routes
app.use('/api/whoami', whoAmIRouter)
app.use('/api/timestamp', timestampRouter)
app.use('/api/url', shortenerRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT)
})