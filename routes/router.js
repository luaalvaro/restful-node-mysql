const express = require('express')
const router = express.Router()
const { getAllUsers, createNewUser, updateUser, deleteUser } = require('../controllers/controller')

    // Get all users from database
    router.get('/', getAllUsers)

    // Create a new user
    router.post('/', createNewUser)

    // Update user
    router.put('/update', updateUser)

    // Delete user
    router.delete('/delete', deleteUser)

module.exports = router