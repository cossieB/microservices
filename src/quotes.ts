import express from 'express';
import { quotes } from './quoteslist';
import shuffleArray from './shuffleArray';

export const quotesRouter = express.Router()

quotesRouter.get('/', (req, res) => {
    
    let {limit} = req.query
    let limitNumber = Number(limit) || 1

    res.json({quotes: slicedQuotes(limitNumber)})
})

export function slicedQuotes(limit: number = 1) {
    let shuffledQuotes = shuffleArray(quotes);
    return shuffledQuotes.slice(0, limit)
}