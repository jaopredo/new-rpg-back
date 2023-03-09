const router = require('express').Router()

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')

/* DATABASE */
const Stand = require('../db/schemas/StandSchema')

/* FUNÇÕES */
const { sendStatus } = require('../functions')

router.post('/', masterAuth, async (req, res) => {
    try {
        const stand = await Stand.create(req.body)
        return res.json({
            ...sendStatus(1),
            standId: stand._id
        })
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.get('/', masterAuth, async (req, res) => {
    try {
        const stand = await Stand.findOne({ charId: req.query.charId })
        return res.json(stand)
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

module.exports = app => app.use('/stand', router)