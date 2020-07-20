const data = require('../../../data.json')
const { age, graduation, class_type, date } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        return res.render('students/index')
    },
    create(req, res) {
        return
    },
    post(req, res) {
        const keys = Object.keys(req.body)


        for (let key of keys) {
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')

        }
        return
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)


        for (let key of keys) {
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')

        }
        return
    },
    delete(req, res) {
        return
    }

}