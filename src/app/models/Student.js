const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
        SELECT * FROM students
        ORDER BY name ASC
        `, function (err, results) {
            if (err) throw `Database error!! ${err}`
            
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO students (
            name,
            avatar_url,
            email,
            birth_date,
            school_level,
            workload,
            teacher_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth_date).iso,
            data.school_level,
            data.workload,
            data.teacher_id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error!! ${err}`

            callback(results.rows[0].id)
        })
    },
    find(id, callback) {
        db.query(`
        SELECT * FROM students
        WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error!! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE students SET
        name=($1),
        avatar_url=($2),
        email=($3),
        birth_date=($4),
        school_level=($5),
        workload=($6),
        teacher_id=($7)
        WHERE id=$8
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth_date).iso,
            data.school_level,
            data.workload,
            data.teacher_id,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error!! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    selectTeacherOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function (err, results) {
            if (err) throw `Database Error!! ${err}`
            
            callback(results.rows)
        })
    }
}