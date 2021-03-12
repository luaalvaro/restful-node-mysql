const User = require('../models/User')
const searchCep = require('../middleware/cepSearch')
const checkDate = require('../middleware/checkDate')

// GET ALL USERS FROM DATABASE
const getAllUsers = (req, res) => {
    User.findAll()
    .then((response) => res.status(200).json({ success: true, response }))
    .catch((error) => res.status(500).json({ success: false, message: error.message }))
}

// CREATE AN NEW USER FROM DATABASE
const createNewUser = async (req, res) => {
    let { name, dateOfBirth, address, description } = req.body

    // Check if the request have the params
    if (!name) return res.status(400).json({ success: false, message: "The NAME must be filled" })
    if (!dateOfBirth) return res.status(400).json({ success: false, message: "The DATE OF BIRTH must be filled" })
    if (!address) return res.status(400).json({ success: false, message: "The ADDRESS must be filled" })

    // Check if date it's valid
    if (!checkDate(dateOfBirth)) return res.status(400).json({ success: false, message: "Date format must be 'YYYY/MM/DD'" })

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
    .then((response) => res.status(201).json({ success: true, message: `User with name ${name} was created sucessfully` }))
    .catch((error) => res.status(500).json({ success: false, error: error.message }))
}

// UPDATE USER FROM DATABASE
const updateUser = async (req, res) => {
    const { id } = req.params
    let { name, dateOfBirth, address, description } = req.body
    let updateUser = {}
    
    // Check if the request have the params
    if (!id) return res.status(400).json({ success: false, message: "The ID must be filled" })
    if (name) updateUser.name = name
    if (dateOfBirth) updateUser.dateOfBirth = dateOfBirth
    if (address) updateUser.address = address
    if (description) updateUser.description = description

    // Check if date it's valid
    if (dateOfBirth && !checkDate(dateOfBirth)) return res.status(400).json({ success: false, message: "Date format must be 'YYYY/MM/DD'" })

        // If the addres contains a cep number, will get data from BrasilApi cep search, and register that at database
        if (address && address.length == 8 && typeof(parseInt(address)) == 'number' ) {
            let data = await searchCep(address)
            updateUser.address = `${data.street}, ${data.neighborhood} - ${data.state}, ${data.cep}`
        }

    User.update(updateUser, { where: { id: id } })
    .then((response) => res.status(201).json({ success: true, message: `User ${name} has been updated` }))
    .catch((error) => res.status(500).json({ success: false, error: error.message }))
}

// DELETE USER FROM DATABASE
const deleteUser = (req, res) => {
    const { id } = req.params

    // Check if the request have the params
    if (!id) return res.status(400).json({ success: false, message: "The ID must be filled"})

    User.destroy({ where: { id: id }})
    .then((response) => res.status(201).json({ success: true, message: `User with id: ${id} has been deleted` }))
    .catch((error) => res.status(500).json({ success: false, error: error.message }))
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }