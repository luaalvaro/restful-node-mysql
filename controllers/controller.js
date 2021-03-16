const User = require('../models/User')
const searchCep = require('../utils/cepSearch')
const checkDate = require('../utils/checkDateIsValid')

// GET ALL USERS FROM DATABASE
const getAllUsers = (req, res) => {
    User.findAll()
    .then((response) => res.status(200).json({ response }))
    .catch((error) => res.status(500).json({ message: error.message }))
}

// CREATE AN NEW USER FROM DATABASE
const createNewUser = async (req, res) => {
    let { name, dateOfBirth, address, description = "" } = req.body

        // If the addres contains a cep number, will get data from BrasilApi cep search, and register that at database
        if (address.length == 8 && typeof(parseInt(address)) == 'number' ) {
            let data = await searchCep(address)
            address = `${data.street}, ${data.neighborhood} - ${data.state}, ${data.cep}`
        }

    User.create({
        name,
        dateOfBirth,
        address,
        description
    })
    .then((response) => res.status(201).json({ message: `User with name ${name} was created sucessfully` }))
    .catch((error) => res.status(500).json({ error: error.message }))
}

// UPDATE USER FROM DATABASE
const updateUser = async (req, res) => {
    const { id } = req.params
    let { name, dateOfBirth, address, description, updateUser = {} } = req.body
    
    // Check if the request have the params
    if (name) updateUser.name = name
    if (dateOfBirth) updateUser.dateOfBirth = dateOfBirth
    if (address) updateUser.address = address
    if (description) updateUser.description = description

        // If the addres contains a cep number, will get data from BrasilApi cep search, and register that at database
        if (address && address.length == 8 && typeof(parseInt(address)) == 'number' ) {
            let data = await searchCep(address)
            updateUser.address = `${data.street}, ${data.neighborhood} - ${data.state}, ${data.cep}`
        }

    User.update(updateUser, { where: { id: id } })
    .then((response) => res.status(201).json({ message: `User ${name} has been updated` }))
    .catch((error) => res.status(500).json({ error: error.message }))
}

// DELETE USER FROM DATABASE
const deleteUser = (req, res) => {
    const { id } = req.params

    // Check if the request have the params
    if (!id) return res.status(400).json({ message: "The ID must be filled"})

    User.destroy({ where: { id: id }})
    .then((response) => res.status(201).json({ message: `User with id: ${id} has been deleted` }))
    .catch((error) => res.status(500).json({ error: error.message }))
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }