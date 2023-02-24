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
        if (await Player.findById(req.id)) {
            const character = await Character.create(req.body)
            await Player.findByIdAndUpdate(req.id, { $push: { charList: character.id } })
            return res.json(sendStatus(1))
        }
        return res.json(sendStatus(0))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.delete('/', masterAuth, async (req, res) => {
    await Character.findByIdAndRemove(req.query.id)
    let { charList } = await Player.findById(req.id)
    charList = charList.filter(id => id !== req.query.id)
    console.log(charList)
    
    await Player.findByIdAndUpdate(req.query.id, { charList })
    return res.json(sendStatus(1))
})

router.get('/', masterAuth, async (req, res) => {
    try {
        const { charList } = await Player.findById(req.id)
        const { id } = req.query

        if (!id) {
            return res.json(charList)
        }
        if (charList.includes(id)) {
            const character = await Character.findById(id)
            return res.json(character)
        }
        return res.json(sendStatus(0, "Esse personagem não é seu ou ele não foi encontrado!"))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

/* ALTERAÇÕES NO PERSONAGEM */
/* ALTERAR VIDA */
router.patch('/life', masterAuth, async (req, res) => {
    try {
        const { combat } = await Character.findById(req.query.id)
        
        combat.actualLife = req.body.life
        
        await Character.findByIdAndUpdate(req.query.id, { combat })
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

/* ALTERAR ENERGIA MENTAL */
router.patch('/mentalEnergy', masterAuth, async (req, res) => {
    try {
        const character = await Character.findById(req.query.id)
        
        character.combat.actualMentalEnergy = req.body.mentalEnergy
        
        await Character.findByIdAndUpdate(req.query.id, character)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

/* MÉTODOS PARA ATUALIZAR PERSONAGENS */
router.patch('/saveXP', masterAuth, async (req, res) => {
    try {
        const character = await Character.findById(req.query.id)
        if (character.level.actualXP !== req.body.actualXP) character.level.actualXP = req.body.actualXP

        await Character.findByIdAndUpdate(req.query.id, character)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

router.patch('/levelUp', masterAuth, async (req, res) => {
    try {
        // Se o player existe no database, pego o meu Personagem
        const character = await Character.findById(req.query.id)

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

        await Character.findByIdAndUpdate(req.query.id, character)
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

module.exports = app => app.use('/character', router)