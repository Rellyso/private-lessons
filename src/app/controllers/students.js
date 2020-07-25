const Student = require('../models/Student')
const { age, graduation, date } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        Student.all(function (students) {
            for (let student of students) {
                student.school_level = graduation(student.school_level)
            }

            return res.render('students/index', { students })
        })
    },
    create(req, res) {
        Student.selectTeacherOptions(function (options) {

            return res.render('students/create', { teacherOptions: options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)


        for (let key of keys) {
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')

        }

        Student.create(req.body, function (student) {
            return res.redirect(`/students/${student}`)
        })

    },
    show(req, res) {
        const { id } = req.params

        Student.find(id, function (student) {
            if (!student) return res.send('Student not found!')

            student.birth_date = date(student.birth_date).birthDay
            student.school_level = graduation(student.school_level)

            Student.selectTeacherOptions(function (options) {
                let teacherOptions = {}

                for (let option of options) {
                    if (option.id == student.teacher_id) {
                        teacherOptions = {
                            ...option
                        }
                    }
                }

                return res.render('students/show', { teacherOptions, student })
            })
        })
    },
    edit(req, res) {
        const { id } = req.params
        Student.find(id, function (student) {

            student.birth_date = date(student.birth_date).iso //AAAA-MM-DD

            Student.selectTeacherOptions(function (options) {

                return res.render('students/edit', { teacherOptions: options, student })
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)


        for (let key of keys) {
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')

        }

        Student.update(req.body, function () {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function () {
            return res.redirect('/students/')
        })
    }

}