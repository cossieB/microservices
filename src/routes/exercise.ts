import express from "express";
import { Users } from "../models/userSchema";

export const exerciseRouter = express.Router()

exerciseRouter.post('/', async (req, res) => {
    try {
        let { username } = req.body;
        let user = new Users({ username })
        await user.save()
        let { _id } = user
        res.json({ username, _id })
    } 
    catch (e: any) {
        res.send("Something went wrong")
    }
})

exerciseRouter.get('/', async (req, res) => {
    try {
        let list = await Users.find().select(['_id', 'username']).exec()
        res.json(list)
    }
    catch (e: any) {
        res.send("Something went wrong")
    }
})

exerciseRouter.post('/:id/logs', async (req, res) => {
    let {description, duration, date} = req.body
    let _id = req.params.id

    if (!duration || Number.isNaN(Number(duration))) {
        return res.send('Invalid Duration')
    }
    if (!description) {
        return res.send('Description required')
    }
    let dateTemp = date ? Date.parse(date) : Date.now()
    
    if (Number.isNaN(dateTemp)) return res.send('Invalid Date')

    let newDate = new Date(dateTemp)

    try {
        let user = await Users.findById(_id).catch(() => null);
        if (!user) return res.send('User not found')
        let obj = {description, duration, date: newDate}
        user.log.push(obj)
        let {username} = user
        await user.save()
        return res.json({_id, username, date: newDate.toDateString(), description})
    } 
    catch (e: any) {
        console.log(e)
        res.send('Something went wrong')
    }
})

exerciseRouter.get('/:id/logs', async (req, res) => {
    let id = req.params.id;
    if (id.length != 24) return res.send('User not found')
    let {from, to, limit} = req.query as {[key: string]: string}
    let numLimit: number
    if (!limit || Number.isNaN(Number(limit))) numLimit = Number.POSITIVE_INFINITY
    else numLimit = Number(limit)
    let fromDate = from ? Date.parse(from) : 0
    if  (Number.isNaN(fromDate)) fromDate = 0
    
    let toDate = to ? Date.parse(to) : Date.now()
    if  (Number.isNaN(toDate)) toDate = Date.now()
    
    const user = await Users.findById(id)
    if (!user) return res.send("User not found")

    let {_id, username, log} = user;
    const log2 = log.filter(item => item.date.getTime() >= fromDate && item.date.getTime() <= toDate )
                    .slice(0, numLimit)
                    .map(item => ({
                        description: item.description,
                        duration: item.duration,
                        date: item.date.toDateString()
                    }))

    let count = log2.length

    return res.json({_id, count, username, log: log2})

})