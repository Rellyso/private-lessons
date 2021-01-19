const { Pool } = require('pg')
require('dotenv/config')

module.exports = new Pool({
    user: process.env.LOCAL_DATABASE_USER,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'my_teacher'
})