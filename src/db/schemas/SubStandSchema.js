const mongoose = require('../connection')

/* FUNÇÕES DO COMBATE */
const { makeStandCombatObject, makeStandMoveObject } = require('../../functions')

/* Schema do Stand */
// Basic, attributes, abilitys vão ser passados pela requisição, o resto vai ser feito automático
const SubStandSchema = new mongoose.Schema({
    playerId: mongoose.Types.ObjectId,
    img: String,
    basic: {
        name: { type: String, required: true },
        standType: { type: String, required: true },
        weakPoint: { type: String, required: true, default: "Nenhum" },
    },
    attributes: {
        strengh: { type: Number, min: 0, max: 5 },
        speed: { type: Number, min: 0, max: 5 },
        durability: { type: Number, min: 0, max: 5 },
        precision: { type: Number, min: 0, max: 5 },
        range: { type: Number, min: 0, max: 5 },
        development: { type: Number, min: 0, max: 5 }
    },
    ability: {
        name: String,
        effect: String,
        dice: String,
        description: String,
    },
    combat: {
        damage: Number,
        shield: Number,
        bonus: Number
    },
    move: {
        range: String,
        apr: Number,
        movement: String,
        standJump: String
    },
})
SubStandSchema.pre('save', function(next) {
    const { attributes } = this
    this.combat = makeStandCombatObject(attributes)
    this.move = makeStandMoveObject(attributes)
    next()
})

const SubStand = mongoose.model('SubStand', SubStandSchema)

module.exports = SubStand