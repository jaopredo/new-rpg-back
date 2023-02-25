const router = require('express').Router()

/* CONFIGS */
const {
    maxLevel,

    charAttributes,
    charSpecialitys,

    standAttributes,
    standPDAbilitys,

    racesMaxAttr,
    racesAbilitys,
    racesAdvantages,

    fightingStyleAbilitys,
    fightingStyleAdvantages
} = require('../configs/limiters.json')

router.get('/maxLevel', (req, res) => res.json(maxLevel))

router.get('/charAttributes', (req, res) => res.json(charAttributes))
router.get('/charSpecialitys', (req, res) => res.json(charSpecialitys))

router.get('/standAttributes', (req, res) => res.json(standAttributes))
router.get('/standPDAbilitys', (req, res) => res.json(standPDAbilitys))

router.get('/racesMaxAttr', (req, res) => res.json(racesMaxAttr))
router.get('/racesAbilitys', (req, res) => res.json(racesAbilitys))
router.get('/racesAdvantages', (req, res) => res.json(racesAdvantages))

router.get('/fightingStyleAbilitys', (req, res) => res.json(fightingStyleAbilitys))
router.get('/fightingStyleAdvantages', (req, res) => res.json(fightingStyleAdvantages))

module.exports = app => app.use('/configs', router)