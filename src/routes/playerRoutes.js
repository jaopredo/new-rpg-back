const router = require('express').Router()

/* DATABASE */
const Player = require('../db/schemas/PlayerSchema')

/* FUNÇÕES */
const masterAuth = require('../middlewares/masterAuth')
const { sendStatus, generateToken } = require('../functions')

router.post('/register', async (req, res) => {
    try {
        if (await Player.findOne({ email: req.body.email })) {
            return res.json(sendStatus(0, "Esse email já está em uso"))
        }

        const player = await Player.create(req.body)

        return res.json({
            token: generateToken({
                id: player.id
            })
        })
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.post('/login', async (req, res) => {
    try {
        if (!await Player.findOne({ email: req.body.email })) {
            return res.json(sendStatus(0, "Esse email não está no banco"))
        }
        const player = await Player.findOne({ email: req.body.email }).select("+password")
        if (player.password === req.body.password) {
            return res.json({token: generateToken({ id: player.id })})
        }
        return res.json(sendStatus(0, "A senha está incorreta!"))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.get('/name', masterAuth, async (req, res) => {
    try {
        const player = await Player.findById(req.id).select("+password")
        if (!player) {
            return res.json(sendStatus(0, "Esse email não está no banco"))
        }
        return res.json(player.name)
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

module.exports = app => app.use('/player', router)