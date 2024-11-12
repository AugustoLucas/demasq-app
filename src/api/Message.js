import * as DB from "./Database.js"

export class Message {
    constructor(text, sender) {
        this.text = text
        this.sender = sender
    }

    matchKeywords () {
        const matchList = []
    
        DB.KEYWORDS.forEach((key) => {
            if (RegExp(key).test(this.text))
                    matchList.push(key)
          })
    
        return (matchList.length > 0) ? matchList : false
    }

    findDomains() {
        const regex = RegExp("[www\.]?[A-Za-z0-9-]{1,63}\\.+[A-Za-z\.]{2,8}[a-zA-Z]{0,2}", "gi")
        const matchList = this.text.match(regex)

        return (matchList != null) ? matchList : false
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

        return (matchList != null) ? matchList : false
    }

    matchPhones() {
        const foundPhones = this.findPhones()
        const matchList = []

        try {
            foundPhones.forEach((phone) => {
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