import express from 'express';
import { URLModel } from '../models/urlSchema';
import dns from 'dns';
import whatwg from 'whatwg-url'

const dnsPromise = dns.promises
export const shortenerRouter = express.Router()

shortenerRouter.post('/', async (req, res) => {
    const {original} = req.body;
    let doc = await URLModel.findOne({original})
    
    if (doc) {
        const {original, short} = doc
        return res.json({original, short})
    }
    
    let q: whatwg.URL;
    // Check if given URL is valid. If not throw exception
    try {
        q = new whatwg.URL(original)
        await dnsPromise.lookup(q.hostname)
    }
    catch (e: any) {
        console.log(e)
        return res.status(400).json({error: "Invalid URL"})
    }
    const allUrls = await URLModel.find();
    let short = `/api/url/${allUrls.length}`
    let url = new URLModel({original, short })
    await url.save()

    res.status(201).json({original, short})
})

shortenerRouter.get('/:num', async (req, res) => {
    const {num} = req.params;
    let doc = await URLModel.findOne({short: '/api/url/'+num});
    
    if (doc) {
        return res.redirect(doc.original)
    }
    else {
        return res.status(404).json({error: "No url found"})
    }
})