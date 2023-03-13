const router = require('express').Router()

const { sendStatus } = require('../functions')

/* MONGO DB */
const Inventory = require('../db/schemas/InventorySchema')

/* MIDDLEWARES */
const masterAuth = require('../middlewares/masterAuth')

// Retorna inventário
router.get('/', masterAuth, async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ charId: req.query.charId })
        return res.json(inventory)
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

// Adicionar algum item no inventário
router.put('/item', masterAuth,  async (req, res) => {
    try {
        const { charId } = req.query
        await Inventory.updateOne({ charId }, { $push: { items: req.body } })
        const inventory = await Inventory.findOne({ charId: req.query.charId })
        return res.json(inventory)
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

// Remove item
router.delete('/item', masterAuth, async (req, res) => {
    try {
        const { itemId, charId } = req.query;

        await Inventory.updateOne({ charId }, { $pull: { items: { _id: itemId } } })

        const inventory = await Inventory.findOne({ charId: req.query.charId })
        
        return res.json(inventory)
    } catch (e) {
        return res.json(sendStatus(0))
    }
})

// Atualiza um item
router.patch('/item', masterAuth, async (req, res) => {
    try{
        const { quantity } = req.body
        const { itemId, charId } = req.query

        await Inventory.updateOne(
            { charId, items: { $elemMatch: { _id: itemId } } },
            {
                $set: {
                    "items.$.quantity": quantity
                }
            }
        )
        return res.json(sendStatus(1))
    } catch (e) {
        return res.json(sendStatus(0))
    }
}) 


module.exports = app => app.use('/inventory', router)