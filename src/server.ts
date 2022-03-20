import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import { whoAmIRouter } from "./whoami";
import { timestampRouter } from "./timestamp";

dotenv.config()
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile("/views/index.html")
})

app.use('/whoami', whoAmIRouter)
app.use('/timestamp', timestampRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT)
})