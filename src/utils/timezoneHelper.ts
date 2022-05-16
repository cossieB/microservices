import { timezones } from "./timestamp";

export default function() {
    let obj: {[key:string]: string} = {}
    let newDate = new Date()
    // Transform each timezone in the timezones array into just the name of the city and make the resulting names keys in the response json.
    for (let zone of timezones) {
        let key: string
        let match = zone.match(/(?<=\/)\w+/); // matches all alphanumeric characters that are preceded by "/"

        if (match) {
            key = String(match)
            obj[key] = newDate.toLocaleString('en-za', {timeZone: zone})
        }
    }
    return {"unix": newDate.getTime(), "utc": newDate.toUTCString(), ...obj}
}