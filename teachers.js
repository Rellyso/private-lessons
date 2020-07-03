const fs = require('fs')
const data = require('./data')

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
// update

// delete