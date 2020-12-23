const db = require('../../config/db')

function find(filters, table, order) {
    let query = `SELECT * FROM ${table}`

    if (filters) {
        Object.keys(filters).map(key => {
            query += ` ${key}` // where

            // where: {key}
            Object.keys(filters[key]).map(field => {
                // id = key[1].id
                query += ` ${field} = ${filters[key][field]}`
            })
        })
    }

    if (order) {
        query += ` GROUP BY ${table} ORDER BY ${table}.${order.by} ${order.type}`
    }

    return db.query(query)
}

function paginate(table, filter, limit, offset) {
    let query = '',
            filterQuery = '',
            totalQuery = `(SELECT count(*) FROM ${table}) AS total`

        if (filter) {
            filterQuery = `WHERE ${table}.name ILIKE '%${filter}%'
            OR ${table}.email ILIKE '%${filter}%'`

            totalQuery = `(
                SELECT count(*) FROM ${table}
                ${filterQuery}
                ) AS total
            `
        }

        query = `
            SELECT ${table}.*, ${totalQuery}, count(${table}) AS total_${table}
            FROM ${table}
            ${filterQuery}
            GROUP BY ${table}.id LIMIT $1 OFFSET $2
        `

        return db.query(query, [limit, offset])
}

const Base = {
    init({ table }) {
        if (!table) throw new Error('Invalid Params')
        this.table = table

        return this
    },
    async find(id) {
        const results = await find({ where: { id } }, this.table)

        return results.rows[0]

    },
    async findOne(filters) {
        const results = await find(filters, this.table)

        return results.rows[0]

    },
    async findAll(order = { by: 'id', type: 'DESC'  } ) {
        const results = await find(filters, this.table, order)

        return results.rows

    },
    async create(fields) {
        try {
            let keys = [],
                values = []

            Object.keys(fields).map(key => {
                keys.push(key)
                values.push(`'${fields[key]}'`)
            })
            // (key1, key2, key3)
            const query = `INSERT INTO ${this.table} (${keys.join(',')})
            VALUES (${values.join(',')})
            RETURNING id`

            const results = await db.query(query)

            return results.rows[0].id

        } catch (error) {
            console.error(error)
        }

    },
    update(id, fields) {
        try {
            let update = []

            Object.keys(fields).map(key => {
                const line = `${key} = '${fields[key]}'`
                update.push(line)
            })

            let query = `UPDATE ${this.table} SET
            ${update.join(',')} WHERE id = ${id}`

            return db.query(query)

        } catch (error) {
            console.error(error)
        }
    },
    delete(id) {
        return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
    },
    async paginate({ filter, limit, offset}) {
        const results = await paginate(this.table, filter, limit, offset)

        return results.rows
    }
}

module.exports = Base