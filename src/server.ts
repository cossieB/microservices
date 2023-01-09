import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import path from "path";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/query";
import * as Routes from "./routes";

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
app.use('/api/whoami', Routes.whoAmIRouter)
app.use('/api/timestamp', Routes.timestampRouter)
app.use('/api/url', Routes.shortenerRouter)
app.use('/api/metadata', Routes.metadataRouter)
app.use('/api/quotes', Routes.quotesRouter)
app.use('/api/email', Routes.emailRouter)
app.use('/api/exercisetracker', Routes.exerciseRouter)
app.use('/api/converter', Routes.converterRouter)
app.use('/api/translate', Routes.translatorRouter)
app.use('/api/issues', Routes.issueRouter);

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