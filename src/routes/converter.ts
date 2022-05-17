import express from "express";
import Converter from "../utils/converter";

export const converterRouter = express.Router()

converterRouter.get('/', (req, res) => {
    const input = req.query.input as string

    try {
        const converter = new Converter(input)
        const {initNum, initUnit, returnUnit} = converter
        const returnNum = converter.convert()
        const string = converter.getString()

        return res.json({initNum, initUnit, returnNum, returnUnit, string})
    }
    catch(e: any) {
        return res.send(e.message)
    }
})