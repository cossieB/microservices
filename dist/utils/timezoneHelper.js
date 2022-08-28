"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timestamp_1 = require("../routes/timestamp");
function default_1() {
    let obj = {};
    let newDate = new Date();
    // Transform each timezone in the timezones array into just the name of the city and make the resulting names keys in the response json.
    for (let zone of timestamp_1.timezones) {
        let key;
        let match = zone.match(/(?<=\/)\w+/); // matches all alphanumeric characters that are preceded by "/"
        if (match) {
            key = String(match);
            obj[key] = newDate.toLocaleString('en-za', { timeZone: zone });
        }
    }
    return { "unix": newDate.getTime(), "utc": newDate.toUTCString(), ...obj };
}
exports.default = default_1;
