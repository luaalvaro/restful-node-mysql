const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env.local' })

const sequelize = new Sequelize(process.env.DATABASE, process.env.admin, process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mysql'
})

module.exports = sequelize