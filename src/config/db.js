const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: "190414",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})