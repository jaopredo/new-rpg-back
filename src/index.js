require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes/playerRoutes')(app)
require('./routes/characterRoutes')(app)
require('./routes/standRoutes')(app)

app.listen(process.env.PORT || 3030)