const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../database/dbConnect')

const User =  sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

// << IMPORTANT >>
//  User.sync({})
// The sync func its used to create a new table, this code must be runned once

module.exports = User