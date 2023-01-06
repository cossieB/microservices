import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import path from "path";
import mongoose from "mongoose";
import { whoAmIRouter } from "./routes/whoami";
import { timestampRouter } from "./routes/timestamp";
import { shortenerRouter } from "./routes/shortener";
import { metadataRouter } from "./routes/metadata";
import { quotesRouter } from "./routes/quotes";
import {emailRouter} from './routes/emailer'
import { exerciseRouter } from "./routes/exercise";
import { converterRouter } from "./routes/converter";
import { translatorRouter } from "./routes/translator";
import { issueRouter } from "./routes/issues";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/query";

dotenv.config()
const app = express()

// Express Middleware
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../public')))
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// Home Page
app.get('/', (req, res) => {
    res.sendFile('index.html')
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