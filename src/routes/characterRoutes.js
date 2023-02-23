const router = require('express').Router()

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')

/* DATABASE */
const Player = require('../db/schemas/PlayerSchema')
const Character = require('../db/schemas/CharacterSchema')

/* FUNÇÕES */
const { sendStatus } = require('../functions')

router.post('/', masterAuth, async (req, res) => {
    try {
        const character = await Character.create(req.body)
        await Player.findByIdAndUpdate(req.id, { $push: { charList: character._id } })
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.delete('/', masterAuth, async (req, res) => {
    try {
        await Character.findByIdAndRemove(req.body.charId)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
    
})

module.exports = app => app.use('/character', router)