const Teacher = require('../models/Teacher')
const { age, graduation, classType, date } = require('../../lib/utils')


module.exports = {
    async index(req, res) {

        try {
            let { filter, page, limit } = req.query

            limit = limit || 2
            page = page || 1

            const offset = limit * (page - 1)

            const teachers = await Teacher.paginate({
                filter,
                page,
                limit,
                offset
            })

            teachers.map(teacher => {
                teacher.subjects_taught = teacher.subjects_taught.split(',')
            })

            const pagination = {
                total: Math.ceil(teachers[0].total / limit) || 0,
                page
            }

            return res.render('teachers/index', { teachers, filter, pagination })
        } catch (error) {
            return res.render('teachers/index', { 
                error: 'Erro ao carregar os professores, por favor entre em contato conosco'
             })
        }


    },
    create(req, res) {
        return res.render('teachers/create')
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "")
                return res.render('teacher/create', {
                    teacher: req.body,
                    error: 'Preencha todos os campos'
                })
        }

        const {
            name,
            birth_date,
            education_level,
            class_type,
            avatar_url,
            subjects_taught
        } = req.body

        const teacherId = await Teacher.create({
            name,
            birth_date,
            education_level,
            class_type,
            avatar_url,
            subjects_taught
        })

        return res.render('parts/registers/success', {
            text: 'Teacher cadastrado com sucesso', // mensagem de sucesso com animação. Não colocar ponto final na mensagem
            redirectTo: teacherId,
        })
    },
    async show(req, res) {
        const { id } = req.params

        let teacher = await Teacher.find(id)

        if (!teacher) return res.render('teachers/show', {
            error: 'Teacher não encontrado'
        })

        teacher.age = age(teacher.birth_date)
        teacher.lessons = teacher.subjects_taught.split(',')
        teacher.created_at = date(teacher.created_at).format
        teacher.class_type = classType(teacher.class_type)
        teacher.education_level = graduation(teacher.education_level)

        return res.render('teachers/show', { teacher })

    },
    async edit(req, res) {
        const { id } = req.params

        let teacher = await Teacher.find(id)

        teacher.birth_date = date(teacher.birth_date).iso

        res.render('teachers/edit', { teacher })
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (let key of keys) {
                if (req.body[key] == "")
                    return res.render('teacher/create', {
                        teacher: req.body,
                        error: 'Preencha todos os campos'
                    })
            }

            const {
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                avatar_url,
                id
            } = req.body

            await Teacher.update(id, {
                name,
                birth_date,
                education_level,
                class_type,
                avatar_url,
                subjects_taught,
            })

            return res.render('parts/registers/success', {
                text: 'Teacher atualizado', // mensagem de sucesso com animação. Não colocar ponto final na mensagem
                redirectTo: id,
            })

        } catch (error) {
            console.error(error)
            return res.render('teachers/edit', {
                teacher: req.body,
                error: 'Não foi possível completar seu pedido, recarregue a página e tente novamente.'
            })
        }
    },
    async delete(req, res) {
        try {
            await Teacher.delete(req.body.id)

            return res.render('parts/registers/removed', {
                text: 'Teacher removido', // mensagem de sucesso com animação. Não colocar ponto final na mensagem
                redirectTo: '/'
            })
        } catch (error) {
            console.error(error)

            return res.render('teachers/edit', {
                error: 'Não foi possível completar seu pedido, recarregue a página e tente novamente.',
                teacher: req.body
            })
        }

    }
}