import { americanOnly } from './components/american-only'
import { americanToBritishSpelling } from './components/american-to-british-spelling'
import { americanToBritishTitles } from './components/american-to-british-titles'
import { britishOnly } from './components/british-only'

let britishToAmericanSpelling: { [key: string]: string } = {}
let britishToAmericanTitles: { [key: string]: string } = {}

for (let key in americanToBritishSpelling) {
    const value = americanToBritishSpelling[key]
    britishToAmericanSpelling[value] = key
}

for (let key in americanToBritishTitles) {
    const value = americanToBritishTitles[key]
    britishToAmericanTitles[value] = key
}

export default class Translator {
    phrase: string
    locale: string
    only: { [key: string]: string }
    spelling: { [key: string]: string }
    titles: { [key: string]: string }

    constructor(phrase: string, locale: 'american-to-british' | 'british-to-american') {
        this.phrase = phrase;
        this.locale = locale;
        this.only = locale === 'british-to-american' ? britishOnly : americanOnly
        this.spelling = locale === 'british-to-american' ? britishToAmericanSpelling : americanToBritishSpelling
        this.titles = locale === 'british-to-american' ? britishToAmericanTitles : americanToBritishTitles
    }
    translate() {
        const translationArray = [...this.searchAndTranslate(this.titles), ...this.searchAndTranslate(this.spelling), ...this.searchAndTranslate(this.only), ...this.translateTime()]
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
        const translationArray = [...this.searchAndTranslate(this.titles), ...this.searchAndTranslate(this.spelling), ...this.searchAndTranslate(this.only), ...this.translateTime()]
        if (translationArray.length == 0) return 'Everything looks good to me!'
        let translation = this.phrase
        translationArray.forEach(item => {
            let regex = new RegExp(`${item.original}`, 'i')
            translation = translation.replace(regex, `<span class=\"highlight\">${item.translated}</span>`)
        })

        return translation
    }
}
