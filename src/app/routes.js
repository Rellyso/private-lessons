const express = require('express')
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')
const routes = express.Router()

routes.get('/', function (req, res) {
    return res.redirect('/teachers')
})

routes.get('/teachers', teachers.index)
routes.post('/teachers', teachers.post)
routes.get('/teachers/create', teachers.create)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.put('/teachers', teachers.put)
routes.delete('/teachers', teachers.delete)

routes.get('/students', students.index)
routes.post('/students', students.post)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.put('/students', students.put)
routes.delete('/students', students.delete)


module.exports = routes