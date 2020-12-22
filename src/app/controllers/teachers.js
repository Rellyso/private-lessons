const Teacher = require('../models/Teacher')
const { age, graduation, classType, date } = require('../../lib/utils')


module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query

        limit = limit || 2
        page = page || 1

        const offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                for (let i = 0; i < teachers.length; i++) {
                    teachers[i] = {
                        ...teachers[i],
                        subjects_taught: teachers[i].subjects_taught.split(','),
                    }
                }

                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                return res.render('teachers/index', { teachers, filter, pagination })
            }
        }

        Teacher.paginate(params)
    //     if (filter) {
    //         Teacher.findBy(filter, function (teachers) {
                

    //             return res.render('teachers/index', { teachers, filter })
    //         })
    //     } else {
    //         Teacher.all(function (teachers) {
    //             for (let i = 0; i < teachers.length; i++) {
    //                 teachers[i] = {
    //                     ...teachers[i],
    //                     subjects_taught: teachers[i].subjects_taught.split(',')
    //                 }
    //             }
    //             return res.render('teachers/index', { teachers })
    //         })
    //     }

    },
    create(req, res) {
        return res.render('teachers/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)


        for (let key of keys) {
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')

        }

        Teacher.create(req.body, function (teacher) {
            return res.redirect(`/teachers/${teacher}`)
        })

    },
    show(req, res) {
        const { id } = req.params

        Teacher.find(id, function (teacher) {
            if (!teacher) return res.send('Teacher not found!')

            teacher.age = age(teacher.birth_date)
            teacher.lessons = teacher.subjects_taught.split(',')
            teacher.created_at = date(teacher.created_at).format
            teacher.class_type = classType(teacher.class_type)
            teacher.education_level = graduation(teacher.education_level)

            return res.render('teachers/show', { teacher: teacher })
        })
    },
    edit(req, res) {
        const { id } = req.params
        Teacher.find(id, function (teacher) {

            teacher.birth_date = date(teacher.birth_date).iso

            res.render('teachers/edit', { teacher })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)


        for (let key of keys) {
            if (req.body[key] == "")
                return res.send('Please fill in all fields.')

        }

        Teacher.update(req.body, function () {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function () {
            return res.redirect('/')
        })
    }

}