"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unitList = ['mi', 'km', 'gal', 'L', 'lbs', 'kg'];
class Converter {
    constructor(input) {
        this.input = input;
        const unit = this.getUnit();
        const num = this.getNum();
        if (unit == 'invalid unit' && num == 'invalid number')
            throw new Error('invalid unit and number');
        if (unit == 'invalid unit')
            throw new Error('invalid unit');
        if (num == 'invalid number')
            throw new Error('invalid number');
        this.initUnit = unit;
        this.initNum = num;
        this.returnUnit = this.getReturnUnit();
    }
    getNum() {
        const idx = this.input.search(/[a-z]/i);
        const num = this.input.slice(0, idx);
        if (/\d+\/\d+\/\d+/.test(num))
            return 'invalid number';
        if (/\/\//.test(num))
            return 'invalid number';
        if (num === '')
            return 1;
        try {
            return Number(eval(num));
        }
        catch {
            return 'invalid number';
        }
    }
    getUnit() {
        const idx = this.input.search(/[a-z]/i);
        if (idx == -1)
            return 'invalid unit';
        const unit = this.input.slice(idx);
        for (let item of unitList) {
            if (item.toLowerCase() == unit.toLowerCase())
                return item;
        }
        return 'invalid unit';
    }
    getReturnUnit() {
        let obj = {
            gal: 'L',
            lbs: 'kg',
            mi: 'km'
        };
        for (let item in obj) {
            if (item.toLowerCase() == this.initUnit.toLowerCase())
                return obj[item];
            if (obj[item].toLowerCase() == this.initUnit.toLowerCase())
                return item;
        }
        return 'invalid unit';
    }
    spellOutUnit(unit) {
        unit = unit.toLowerCase();
        switch (unit) {
            case 'gal':
                return 'gallons';
            case 'lbs':
                return 'pounds';
            case 'mi':
                return 'miles';
            case 'l':
                return 'liters';
            case 'kg':
                return 'kilograms';
            case 'km':
                return 'kilometers';
            default:
                return 'Invalid Unit';
        }
    }
    convert() {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let unit = this.initUnit.toLowerCase();
        switch (unit) {
            case 'gal':
                return Math.round(this.initNum * galToL * 100000) / 100000;
            case 'lbs':
                return Math.round(this.initNum * lbsToKg * 100000) / 100000;
            case 'mi':
                return Math.round(this.initNum * miToKm * 100000) / 100000;
            case 'l':
                return Math.round(this.initNum / galToL * 100000) / 100000;
            case 'kg':
                return Math.round(this.initNum / lbsToKg * 100000) / 100000;
            case 'km':
                return Math.round(this.initNum / miToKm * 100000) / 100000;
            default:
                return 0;
        }
    }
    getString() {
        return `${this.initNum} ${this.spellOutUnit(this.initUnit)} converts to ${this.convert()} ${this.spellOutUnit(this.returnUnit)}`;
    }
}
exports.default = Converter;
