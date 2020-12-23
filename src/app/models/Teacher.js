const Base = require('./Base')
const db = require('../../config/db')
const { date } = require('../../lib/utils')


Base.init({ table: 'teachers' })

const Teacher = {
    ...Base,
}

module.exports = Teacher