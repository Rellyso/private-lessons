const fs = require('fs')
const data = require('./data')
const { age, graduation, class_type, date } = require('./utils')

// create
exports.post = function (req, res) {

    const keys = Object.keys(req.body)


    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('Please fill in all fields.')

    }

    let { avatar_url, name, birth, grade, class_type, lessons } = req.body


    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()
    birth = Date.parse(birth)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        grade,
        class_type,
        lessons,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error.')

        return res.redirect('/teachers')
    })

    // return res.send(data)
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) {
        return res.send('Teacher not found!')
    }

    teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        grade: graduation(foundTeacher.grade),
        class_type: class_type(foundTeacher.class_type),
        lessons: foundTeacher.lessons.split(','),
        created_at: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(foundTeacher.created_at)
    }

    return res.render('teachers/show.njk', { teacher })
}
// edit

exports.edit = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    res.render('teachers/edit.njk', { teacher })
}

// put 

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex
            // console.log(foundIndex)

            return true
        }
    })
    // console.log(index)

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if(err) return res.send('File write error!')
    })

    return res.redirect(`/teachers/${id}`)
}

// delete

exports.delete = function (req, res) {
    const { id } = req.body

    filteredTeachers = data.teachers.filter( function (teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('File write error!')
    })

    return res.redirect('/teachers')

}