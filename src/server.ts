import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import path from "path";
import mongoose from "mongoose";
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import * as Routes from "./routes";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

dotenv.config()
const app = express()
const apollo = new ApolloServer({ typeDefs, resolvers })

// Express Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../public')))

// Home Page
app.get('/', (_, res) => {
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

const httpServer = http.createServer(app)
const PORT = process.env.PORT || 5000;

(async function () {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        await apollo.start()
        app.use('/graphql', expressMiddleware(apollo))
        await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`Server is listening on port ${PORT}`)
    }
    catch (e: any) {
        console.log(e)
    }
})()