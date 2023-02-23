const router = require('express').Router()

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')

/* DATABASE */
const Player = require('../db/schemas/PlayerSchema')

/* FUNÇÕES */
const { sendStatus, generateToken } = require('../functions')



module.exports = app => app.use('/character', router)