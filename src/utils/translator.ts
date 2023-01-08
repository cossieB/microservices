import { americanOnly } from './components/american-only'
import { americanToBritishSpelling } from './components/american-to-british-spelling'
import { americanToBritishTitles } from './components/american-to-british-titles'
import { britishOnly } from './components/british-only'

function reverseMap(obj: {[x: string]: string}) {
    const reversedObj: typeof obj = {}
    for (let key in obj) {
        const value = obj[key]
        reversedObj[value] = key
    }
    return reversedObj
}

export default class Translator {
    phrase: string
    locale: string
    translationMap: { [key: string]: string }
    titles: { [key: string]: string }

    constructor(phrase: string, locale: 'american-to-british' | 'british-to-american') {
        this.phrase = phrase;
        this.locale = locale;
        if (locale == 'american-to-british') {
            this.translationMap = {...americanOnly, ...americanToBritishSpelling, ...reverseMap(britishOnly)}
        }
        else {
            this.translationMap = {...reverseMap(americanOnly), ...reverseMap(americanToBritishSpelling), ...britishOnly}
        }
        this.titles = locale === 'british-to-american' ? reverseMap(americanToBritishTitles) : americanToBritishTitles
    }
    translate() {
        const translationArray = [...this.searchAndTranslate(this.titles), ...this.searchAndTranslate(this.translationMap), ...this.translateTime()]
        if (translationArray.length == 0) return 'Everything looks good to me!'
        let translation = this.phrase
        translationArray.forEach(item => {
            let regex = new RegExp(`${item.original}`, 'i')
            translation = translation.replace(regex, item.translated)
        })

        return translation
    }
    searchAndTranslate(obj: { [x: string]: string }) {
        let matches = []

        

        for (let key in obj) {
            let regex = new RegExp(`(^|\\s)${key}(\\s|$|\\.)`);
    
            if (regex.test(this.phrase.toLowerCase())) {
                let translated = obj[key]
                if (obj == this.titles) {
                    translated = obj[key][0].toUpperCase() + obj[key].slice(1)
                }
                matches.push({ original: key, translated })
            }
        }

        return matches
    }
    translateTime() {
        let matches: { original: string; translated: string }[] = [];

        if (this.locale == 'american-to-british' && /\d{1,2}:\d{2}/.test(this.phrase.toLowerCase())) {
            this.phrase.match(/\d{1,2}:\d{2}/g)!.forEach(match => {
                matches.push({ original: match, translated: match.replace(':', '.') })
            })
        }
        if (this.locale == 'british-to-american' && /\d{1,2}\.\d{2}/.test(this.phrase.toLowerCase())) {
            this.phrase.match(/\d{1,2}\.\d{2}/g)!.forEach(match => {
                matches.push({ original: match, translated: match.replace('.', ':') })
            })
        }
        return matches
    }
    highlight() {
        const translationArray = [...this.searchAndTranslate(this.titles), ...this.searchAndTranslate(this.translationMap), ...this.translateTime()]
        if (translationArray.length == 0) return 'Everything looks good to me!'
        let translation = this.phrase
        translationArray.forEach(item => {
            let regex = new RegExp(`${item.original}`, 'i')
            translation = translation.replace(regex, `<span class=\"highlight\">${item.translated}</span>`)
        })

        return translation
    }
}
