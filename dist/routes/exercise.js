"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRouter = void 0;
const express_1 = __importDefault(require("express"));
const userSchema_1 = require("../models/userSchema");
exports.exerciseRouter = express_1.default.Router();
exports.exerciseRouter.post('/', async (req, res) => {
    try {
        let { username } = req.body;
        let user = new userSchema_1.Users({ username });
        await user.save();
        let { _id } = user;
        res.json({ username, _id });
    }
    catch (e) {
        res.send("Something went wrong");
    }
});
exports.exerciseRouter.get('/', async (req, res) => {
    try {
        let list = await userSchema_1.Users.find().select(['_id', 'username']).exec();
        res.json(list);
    }
    catch (e) {
        res.send("Something went wrong");
    }
});
exports.exerciseRouter.post('/:id/logs', async (req, res) => {
    let { description, duration, date } = req.body;
    let _id = req.params.id;
    if (!duration || Number.isNaN(Number(duration))) {
        return res.send('Invalid Duration');
    }
    if (!description) {
        return res.send('Description required');
    }
    let dateTemp = date ? Date.parse(date) : Date.now();
    if (Number.isNaN(dateTemp))
        return res.send('Invalid Date');
    let newDate = new Date(dateTemp);
    try {
        let user = await userSchema_1.Users.findById(_id).catch(() => null);
        if (!user)
            return res.send('User not found');
        let obj = { description, duration, date: newDate };
        user.log.push(obj);
        let { username } = user;
        await user.save();
        return res.json({ _id, username, date: newDate.toDateString(), description });
    }
    catch (e) {
        console.log(e);
        res.send('Something went wrong');
    }
});
exports.exerciseRouter.get('/:id/logs', async (req, res) => {
    let id = req.params.id;
    if (id.length != 24)
        return res.send('User not found');
    let { from, to, limit } = req.query;
    let numLimit;
    if (!limit || Number.isNaN(Number(limit)))
        numLimit = Number.POSITIVE_INFINITY;
    else
        numLimit = Number(limit);
    let fromDate = from ? Date.parse(from) : 0;
    if (Number.isNaN(fromDate))
        fromDate = 0;
    let toDate = to ? Date.parse(to) : Date.now();
    if (Number.isNaN(toDate))
        toDate = Date.now();
    const user = await userSchema_1.Users.findById(id);
    if (!user)
        return res.send("User not found");
    let { _id, username, log } = user;
    const log2 = log.filter(item => item.date.getTime() >= fromDate && item.date.getTime() <= toDate)
        .slice(0, numLimit)
        .map(item => ({
        description: item.description,
        duration: item.duration,
        date: item.date.toDateString()
    }));
    let count = log2.length;
    return res.json({ _id, count, username, log: log2 });
});
