const fs = require('fs')
const data = require('./data')
const { age, graduation } = require('./utils')

// create
exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    
    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('Please fill in all fields.')

    }
    
    let {avatar_url, name, birth, grade, class_type, lessons} = req.body
    

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
    } )

    // return res.send(data)
}

exports.show = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find( function (teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) {
        return res.send('Teacher not found!')
    }

    teacher = {
        ...foundTeacher,
        grade: graduation(foundTeacher.grade),
        age: age(foundTeacher.birth),
        lessons: foundTeacher.lessons.split(','),
        created_at: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric'}).format(foundTeacher.created_at)
    }

    return res.render('teachers/show.njk', { teacher })
}
// update

// delete