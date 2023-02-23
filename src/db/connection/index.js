require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
mongoose.set('strictQuery', true)

module.exports = mongoose