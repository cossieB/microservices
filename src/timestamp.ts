import express from 'express';

export const timestampRouter = express.Router()

timestampRouter.get('/:date?', (req, res) => {
    let { date } = req.params;
    let newDate: Date;
    date ? newDate = new Date(date) : newDate = new Date()

    if (Number(date)) {
        let UTC = new Date(Number(date));
        res.json({ "unix": date, "utc": UTC.toUTCString() })
    }
    else if (newDate.toString() != "Invalid Date") {
        res.json({ "unix": newDate.getTime(), "utc": newDate.toUTCString() })
    }
    else {
        res.json({ "error": "Invalid Date" })
    }
})