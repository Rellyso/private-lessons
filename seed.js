const faker = require('faker')

const Student = require('./src/app/models/Student')
const Teacher = require('./src/app/models/Teacher')

let
    teacherIds = [],
    totalTeachers = 10,
    totalStudents = 5,
    educationLevels = [
        'medio',
        'superior',
        'mestrado',
        'doutorado',
    ],
    classType = [
        'presencial',
        'distancia'
    ],
    schoolLevels = [
        '5EF',
        '6EF',
        '7EF',
        '8EF',
        '9EF',
        '1EM',
        '2EM',
        '3EM',
    ],
    subjectsList = [
        'Português',
        'Matemática',
        'Ciências',
        'História',
        'Geografia',
        'Física',
        'Química',
        'Educação Física',
    ]

async function createTeachers() {
    try {
        const teachers = []
        let subjects = [],
            maxSubjects = Math.floor(Math.random() * 6) + 1


        while (subjects.length < maxSubjects) {
            subjects.push(subjectsList[Math.floor(Math.random() * subjectsList.length)])
        }

        while (teachers.length < totalTeachers) {
            teachers.push({
                name: faker.name.firstName(),
                birth_date: new Date(faker.date.past(20)).toUTCString(),
                education_level: educationLevels[Math.floor(Math.random() * educationLevels.length)],
                class_type: classType[Math.floor(Math.random() * classType.length)],
                subjects_taught: subjects,
                avatar_url: faker.image.avatar(),
            })
        }


        const teachersPromise = teachers.map(teacher => Teacher.create(teacher))

        teacherIds = await Promise.all(teachersPromise)
    } catch (error) {
        console.error(error)
    }
}

async function createStudents() {
    try {
        const students = []

        while (students.length < totalStudents) {
            students.push({
                name: faker.name.firstName(),
                email: faker.internet.email(),
                avatar_url: faker.image.avatar(),
                birth_date: new Date(faker.date.past((Math.floor(Math.random() * 6)) + 10)).toUTCString(),
                school_level: schoolLevels[Math.floor(Math.random() * schoolLevels.length)],
                workload: faker.random.number(60) + 5,
                teacher_id: teacherIds[Math.floor(Math.random() * teacherIds.length)]
            })
        }

        console.log(students)

        const studentsPromise = students.map(student => Student.create(student))
        await Promise.all(studentsPromise)
    } catch (error) {
        console.error(error)
    }
}

async function init() {
    try {
        await createTeachers()
        await createStudents()
    } catch (error) {
        console.log(error)
    }
}

init()