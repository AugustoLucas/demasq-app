import * as DB from "./Database.js"

export class Message {
    constructor(text, sender) {
        this.text = text
        this.sender = sender
    }

    matchKeywords () {
        const matchList = []
    
        DB.KEYWORDS.forEach((key) => {
            if (RegExp(key, "i").test(this.text))
                    matchList.push(key)
          })
    
        return (matchList.length > 0) ? matchList : false
    }

    findDomains() {
        const regex = RegExp("(?:WWW\\.)?([A-Za-z0-9-]{1,63}\\.)+[A-Za-z]{1,3}(\\.[a-zA-Z]{0,2})?", "gi")
        const matchList = this.text.match(regex)

        if (matchList != null) {
            for (let i = 0; i < matchList.length; i++) {
                let domain = matchList[i]
                
                domain = domain.toLowerCase().replace('www.', '')
                domain = domain.split('')

                let count = domain.filter( l => l === '.').length

                while (count > 2) {
                    if (domain.shift() === '.')
                        count--
                }

                matchList[i] = domain.join('')
            }
            
            return matchList
        }

        return false
    }   

    matchDomains() {
        const foundDomains = this.findDomains()
        const matchList = []

        try {
            foundDomains.forEach((domain) => {
                if (DB.LEGITDOMAINS[domain] != undefined)
                    matchList.push([domain, DB.LEGITDOMAINS[domain]])
            })
        } catch (e) {
            if (e instanceof TypeError) {
                return false
            }
        }
        
        return (matchList.length > 0) ? matchList : false
    }

    matchSender() {
        const name = DB.LEGITPHONENUMBERS[this.sender]

        return (name != undefined) ? name : false
    }

    findPhones() {
        const regex = /(1\d\d(\d\d)?)|(0800 ?\d{3} ?\d{4})|((\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4})/g
        const matchList = this.text.match(regex)
        var cleanedList = []
        
        if (matchList != null) {
            matchList.forEach( phone => {
                cleanedList.push(phone.replace(/ .-()/, ''))
            })
        } else {
            return false
        }
    }

    matchPhones() {
        const foundPhones = this.findPhones()
        const matchList = []

        try {
            cleanedPhones.forEach((phone) => {
                if (DB.LEGITPHONENUMBERS[phone] != undefined)
                    matchList.push([phone, DB.LEGITPHONENUMBERS[phone]])
            })
        } catch (e) {
            if (e instanceof TypeError) {
                return []
            }
        }
        
        return (matchList.length > 0) ? matchList : false
    }
}