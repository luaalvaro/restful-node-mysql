const express = require('express')
const dotenv = require('dotenv')

const app = express()

app.use(express.json({ type: "application/json" }))

dotenv.config({ path: '.env.local' })

app.use('/api/', require('./routes/router'))

app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`))