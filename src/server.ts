import cors from "cors";
import express from "express";
import { whoAmIRouter } from "./whoami";

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile("/public/index.html")
})

app.use('/whoami', whoAmIRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT)
})