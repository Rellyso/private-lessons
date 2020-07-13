module.exports = {
    age: function (timestamp) {
        const now = new Date()

        let age = now.getFullYear() - new Date(timestamp).getFullYear()
        const month = now.getMonth() - new Date(timestamp).getMonth()
        const day = now.getDate() - new Date(timestamp).getDate()

        if (month < 0 || month == 0 && day < 0) {
            age -= 1
        }
        // 06/07/2020 - hoje
        // 05/07/2020 - birth
        return age
    },
    graduation: function (grade) {
        switch (grade) {
            case "5EF":
                grade = "5º Ano do Ensino Fundamental"
                break
            case "6EF":
                grade = "5º Ano do Ensino Fundamental"
                break
            case "7EF":
                grade = "7º Ano do Ensino Fundamental"
                break
            case "8EF":
                grade = "8º Ano do Ensino Fundamental"
                break
            case "9EF":
                grade = "9º Ano do Ensino Fundamental"
                break
            case "1EM":
                grade = "1º Ano do Ensino Médio"
                break
            case "2EM":
                grade = "2º Ano do Ensino Médio"
                break
            case "3EM":
                grade = "3º Ano do Ensino Médio"
                break
            case "medio":
                grade = "Ensino Médio Completo"
                break
            case "superior":
                grade = "Ensino Superior Completo"
                break
            case "mestrado":
                grade = "Mestrado"
                break
            case "doutorado":
                grade = "Doutorado"
        }

        return grade
    },
    class_type: function (type) {
        let formatedType = ''
        type == 'distancia' ? formatedType = 'À Distância' : formatedType = 'Presencial'

        return formatedType
    },
    date: function (timestamp) {
        let date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${(date.getUTCMonth() + 1)}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    }

}