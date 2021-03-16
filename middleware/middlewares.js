const checkDate = require('../utils/checkDateIsValid')

const checkParamsNewUser = (req, res, next) => {
    let { name, dateOfBirth, address, description } = req.body

    // Check if the request have the params
    if (!name) return res.status(400).json({ message: "The NAME must be filled" })
    if (!dateOfBirth) return res.status(400).json({ message: "The DATE OF BIRTH must be filled" })
    
    // Check if date it's valid
    if (!checkDate(dateOfBirth)) return res.status(400).json({ message: "Date format must be 'YYYY/MM/DD'" })
    
    // Check if the request have the params
    if (!address) return res.status(400).json({ message: "The ADDRESS must be filled" })


    next()
}

const checkParamsUpdateUser = (req, res, next) => {
    const { id } = req.params
    let { name, dateOfBirth, address, description } = req.body
    
    if (!id) return res.status(400).json({ message: "The ID must be filled" })
    if (!name && !dateOfBirth && !address && !description) return res.status(400).json({ message: "You need to update someone field" })

    // Check if date it's valid
    if (dateOfBirth && !checkDate(dateOfBirth)) return res.status(400).json({ message: "Date format must be 'YYYY/MM/DD'" })

    next()
}

module.exports = { checkParamsNewUser, checkParamsUpdateUser }