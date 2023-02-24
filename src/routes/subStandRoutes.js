const router = require('express').Router()

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')

/* DATABASE */
const SubStand = require('../db/schemas/SubStandSchema')

/* FUNÇÕES */
const { sendStatus } = require('../functions')

router.post('/', masterAuth, async (req, res) => {
    try {
        await SubStand.create(req.body)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.get('/', masterAuth, async (req, res) => {
    try {
        const subStand = await SubStand.findOne({ charId: req.query.charId })
        return res.json(subStand)
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

module.exports = app => app.use('/substand', router)