import { Router } from "express";
import Translator from "../utils/translator";

export const translatorRouter = Router()

translatorRouter.post('/', (req, res) => {
    const {text, locale}  = req.body
    if (text == undefined || locale == undefined) return res.json({ error: 'Required field(s) missing' })
    if (text == '') return res.json({error: 'No text to translate'})
    if (locale != 'american-to-british' && locale != 'british-to-american') return res.json({error: 'Invalid value for locale field'})

    const translator = new Translator(text, locale)

    const translation = translator.highlight(); 

    return res.json({text, translation})
})