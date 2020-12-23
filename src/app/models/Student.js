const Base = require('./Base')
const db = require('../../config/db')

Base.init({ table: 'students' })

const Student = {
    ...Base,
    async selectTeacherOptions() {
        const results = await db.query(`SELECT name, id FROM teachers`)

        return results.rows
    },
    async findWithTeacher(id) {
        let query = `SELECT students.*, teachers.name AS teacher_name FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1`

        const results = await db.query(query, [id])

        return results.rows[0]
    }
}

module.exports = Student