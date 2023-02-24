const router = require('express').Router()
const { maxLevel, xpTable } = require('../configs/limiters.json')

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

router.get('/', masterAuth, async (req, res) => {
    try {
        const character = await Character.findById(req.body.charId)
        return res.json(character)
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

/* ALTERAÇÕES NO PERSONAGEM */
/* ALTERAR VIDA */
router.patch('/life', masterAuth, async (req, res) => {
    try {
        const character = await Character.findById(req.body.charId)
        
        character.combat.actualLife = req.body.life
        
        await Character.findByIdAndUpdate(req.body.charId, character)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

/* ALTERAR ENERGIA MENTAL */
router.patch('/mentalEnergy', masterAuth, async (req, res) => {
    try {
        const character = await Character.findById(req.body.charId)
        
        character.combat.actualMentalEnergy = req.body.mentalEnergy
        
        await Character.findByIdAndUpdate(req.body.charId, character)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

/* MÉTODOS PARA ATUALIZAR PERSONAGENS */
router.patch('/saveXP', masterAuth, async (req, res) => {
    try {
        const character = await Character.findById(req.body.charId)
        if (character.level.actualXP !== req.body.actualXP) character.level.actualXP = req.body.actualXP

        await Character.findByIdAndUpdate(req.body.charId, character)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.patch('/levelUp', masterAuth, async (req, res) => {
    try {
        // Se o player existe no database, pego o meu Personagem
        const character = await Character.findById(req.body.charId)

        /* ALTERANDO O NÍVEL DO PERSONAGEM */
        const { level } = character
        // Checo se já está no nível máximo
        if (level.actualLevel >= maxLevel) return res.json(sendStatus(0, "Nível máximo"))
        level.actualLevel += 1;
        level.maxXP = xpTable[level.actualLevel-1];
        level.actualXP = 0;

        if (req.body.type == "attribute") {
            character.attributes = {
                ...character.attributes,
                ...req.body.obj
            }
        } else if (req.body.type == "spec") {
            character.specialitys[req.body.obj.label][req.body.obj.spec] = true 
        }

        await Character.findByIdAndUpdate(req.body.charId, character)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

module.exports = app => app.use('/character', router)