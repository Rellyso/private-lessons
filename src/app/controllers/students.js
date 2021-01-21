const Student = require('../models/Student')
const { graduation, date } = require('../../lib/utils')


module.exports = {
    async index(req, res) {
        try {
            let { filter, page, limit } = req.query

            limit = limit || 3
            page = page || 1

            const offset = limit * (page - 1)

            const students = await Student.paginate({
                filter,
                page,
                limit,
                offset
            })

            students.map(student => {
                student.school_level = graduation(student.school_level)
            })

            const pagination = {
                total: Math.ceil(students[0].total / limit),
                page
            }

            return res.render('students/index', { students, filter, pagination })

        } catch (error) {
            console.error(error)
            return res.render('students/index', {
                error: 'Error ao carregar, entre em contato conosco'
            })
        }
    },
    async create(req, res) {
        const teacherOptions = await Student.selectTeacherOptions()

        return res.render('students/create', { teacherOptions })
    },
    async post(req, res) {
        try {
            const {
                name,
                email,
                avatar_url,
                birth_date,
                school_level,
                workload,
                teacher_id
            } = req.body

            const keys = Object.keys(req.body)

            for (let key of keys) {
                if (req.body[key] == "")
                    return res.render('students/create', {
                        student: req.body,
                        teacherOptions: await Student.selectTeacherOptions(),
                        error: 'Preencha todos os campos'
                    })

            }

            const studentId = await Student.create({
                name,
                email,
                avatar_url,
                birth_date,
                school_level,
                workload,
                teacher_id
            })

            return res.render('parts/registers/success', {
                text: 'Student cadastrado com sucesso', // mensagem de sucesso com animação. Não colocar ponto final na mensagem
                redirectTo: studentId,
            })

        } catch (error) {
            console.error(error)

            return res.render('students/create', {
                error: 'Não foi possível completar seu pedido, recarregue a página e tente novamente.'
            })
        }
    },
    async show(req, res) {
        const { id } = req.params

        const student = await Student.findWithTeacher(id)

        if (!student) return res.send('Student not found!') // adicionar mensagem no frontEnd

        student.birth_date = date(student.birth_date).birthDay
        student.school_level = graduation(student.school_level)

        return res.render('students/show', { student })
    },
    async edit(req, res) {
        try {
            const { id } = req.params

            const student = await Student.find(id)

            student.birth_date = date(student.birth_date).iso //AAAA-MM-DD

            const teacherOptions = await Student.selectTeacherOptions()

            return res.render('students/edit', { teacherOptions, student })

        } catch (error) {
            console.error(error)
            return res.render('students/edit', {
                error: 'Não foi possível completar seu pedido, recarregue a página e tente novamente.'
            })
        }
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (let key of keys) {
                if (req.body[key] == "")
                    return res.render('students/create', {
                        student: req.body,
                        teacherOptions: await Student.selectTeacherOptions(),
                        error: 'Preencha todos os campos'
                    })
            }

            const {
                name,
                email,
                avatar_url,
                birth_date,
                school_level,
                workload,
                teacher_id,
                id
            } = req.body

            await Student.update(id, {
                name,
                email,
                avatar_url,
                birth_date,
                school_level,
                workload,
                teacher_id
            })

            return res.render('parts/registers/success', {
                text: 'Student atualizado', // mensagem de sucesso com animação. Não colocar ponto final na mensagem
                redirectTo: id,
            })

        } catch (error) {
            console.error(error)
            return res.render('students/edit', {
                error: 'Não foi possível completar seu pedido, recarregue a página e tente novamente.'
            })
        }
    },
    async delete(req, res) {
        try {
            await Student.delete(req.body.id)

            return res.render('parts/registers/removed', {
                text: 'Student removido', // mensagem de sucesso com animação. Não colocar ponto final na mensagem
                redirectTo: '/students'
            })
            
        } catch (error) {
            console.error(error)

            return res.render('students/edit', {
                error: 'Não foi possível completar seu pedido, recarregue a página e tente novamente.'
            })
        }
    }
}