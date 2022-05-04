require('./database/db')
const express = require('express')
const env = require('./env')
const cors = require('cors')

const films = require('./routes/films')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/films', films)

app.listen(env.port, () => console.log(`App listening on port: ${env.port}`))

module.exports = app