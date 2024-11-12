
class Analisys {
    static subject(message) {
        let suspect = 0
        let tips = new Array()

        const keywords = message.matchKeywords()
        if (keywords) {
            suspect++
            tips.push(`A mensagem exige atenção, pois trata de ${keywords.toString()}`)
        } else {
            tips.push('A mensagem parece não tratar de assuntos financeiros')
        }

        return {
            suspect:suspect,
            tips:tips
        }
    }

    static domains(message) {
        let suspect = 0
        let tips = new Array()

        const foundDomains = message.findDomains()
        const legitDomains = message.matchDomains()

        if (foundDomains) {
            if (legitDomains) {
                legitDomains.forEach(domain => {
                    tips.push(`O endereço ${domain[0]}, presente na mensagem, é o site oficial de ${domain[1]}`)
                });
            } else {
                suspect++
                tips.push(`O(s) endereço(s) ${foundDomains.toString()} parece(m) não ser legítimo(s)`)
            }
        }
        
        return {
            suspect:suspect,
            tips:tips
        }
    }

    static phones(message) {
        var suspect = 0
        let tips = new Array()

        const foundPhones = message.findPhones()
        const legitPhones = message.matchPhones()

        if (foundPhones) {
            if (legitPhones) {
                legitPhones.forEach(phone => {
                    tips.push(`\nO número ${phone[0]}, citado na mensagem, é um canal de comunicação oficial de ${phone[1]}`)
                });
            } else {
                suspect++
                tips.push(`O(s) telefone(s) ${foundPhones.toString()}, citado(s) na mensagem, parece(m) não pertencer a uma instituição financeira`)
            }
        }

        return {
            suspect:suspect,
            tips:tips
        }
    }

    static sender(message) {
        let suspect = 0
        let tips = new Array()

        if (message.matchSender()) {
            tips.push(`O número ${message.sender}, que enviou a mensagem, é um canal de comunicação oficial de ${message.matchSender()}`)
        } else {
            suspect++
            tips.push(`O número ${message.sender}, que enviou a mensagem, parece não pertencer a uma instituição financeira`)
        }

        return {
            suspect:suspect,
            tips:tips
        }
    }

    static execute(message) {
        let result = ''
        const tips = [
            ...Analisys.subject(message).tips,
            ...Analisys.domains(message).tips,
            ...Analisys.phones(message).tips,
            ...Analisys.sender(message).tips
        ]
        const suspect =
            Analisys.subject(message).suspect +
            Analisys.domains(message).suspect +
            Analisys.phones(message).suspect +
            Analisys.sender(message).suspect

        switch (suspect) {
            case 0:
                result = 'LEGÍTIMA'
                break
            case 1:
                result = 'NEUTRA'
                break;
            default:
                result = 'SUSPEITA'
        }

        if (tips.length == 0) {
            tips.push('Não foram encontradas informações suspeitas ou legítimas na mensagem')
        }

        return {
            result:result,
            tips:tips
        }
    }
}

export default Analisys;