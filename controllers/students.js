const fs = require('fs')
const data = require('../data.json')
const { date, graduation } = require('../utils')

// index
exports.index = function (req, res) {

    const students = [
        ...data.students
    ]

    for (let i = 0; i < students.length; i++) {
        students[i] = {
            ...students[i],
            school_grade: graduation(students[i].school_grade) 
        }
    }

    return res.render('students/index', { students })
}

// create
exports.create = function (req, res) {
    return res.render('students/create')
}

// post
exports.post = function (req, res) {

    const keys = Object.keys(req.body)


    for (let key of keys) {
        if (req.body[key] == "")
            return res.send('Please fill in all fields.')
    }



    let id = 1
    const lastStudent = data.students[data.students.length - 1]
    
    if (lastStudent) {
        id = lastStudent.id + 1
    }
    
    birth = Date.parse(req.body.birth)

    data.students.push({
        id: Number(id),
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error.')

        return res.redirect('/students')
    })

    // return res.send(data)
}

// show
exports.show = function (req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function (student) {
        return student.id == id
    })

    if (!foundStudent) {
        return res.send('Student not found!')
    }

    student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        school_grade: graduation(foundStudent.school_grade)
    }

    return res.render('students/show.njk', { student })
}

// edit
exports.edit = function (req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function (student) {
        return student.id == id
    })

    student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    res.render('students/edit.njk', { student })
}

// put 
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function (student, foundIndex) {
        if (student.id == id) {
            index = foundIndex
            // console.log(foundIndex)

            return true
        }
    })
    // console.log(index)

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if(err) return res.send('File write error!')
    })

    return res.redirect(`/students/${id}`)
}

// delete
exports.delete = function (req, res) {
    const { id } = req.body

    filteredStudents = data.students.filter( function (student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('File write error!')
    })

    return res.redirect('/students')

}