import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import { whoAmIRouter } from "./whoami";
import { timestampRouter } from "./timestamp";

dotenv.config()
const app = express()

// Express Middleware
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static(process.cwd() + '/public'))

// Home Page
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/views/index.html")
})


// API Routes
app.use('/api/whoami', whoAmIRouter)
app.use('/api/timestamp', timestampRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT)
})