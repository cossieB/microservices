import express from 'express';

export const timezones = [
    'Africa/Johannesburg',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Australia/Sydney',
    'America/Toronto',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'America/Sao_Paulo',
    'Africa/Lagos'
]

export const timestampRouter = express.Router()

timestampRouter.get('/:date?', (req, res) => {
    let { date } = req.params;
    let newDate: Date;
        
    if (!date) {
        newDate = new Date()
    }
    else {
        if (Number(date)) {
            newDate = new Date(Number(date))
        }
        else if (new Date(date).toString() != "Invalid Date") {
            newDate = new Date(date)
        }
        else return res.status(400).json({error: "Invalid Date"})
    }
    
    let obj: {[key:string]: string} = {}

    // Transform each timezone in the timezones array into just the name of the city and make the resulting names keys in the response json.
    for (let zone of timezones) {
        let key: string
        let match = zone.match(/(?<=\/)\w+/); // matches all alphanumeric characters that are preceded by "/"

        if (match) {
            key = String(match)
            obj[key] = newDate.toLocaleString('en-za', {timeZone: zone})
        }
    }

    res.json({"unix": newDate.getTime(), "utc": newDate.toUTCString(), ...obj})
})