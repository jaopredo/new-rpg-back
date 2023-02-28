const mongoose = require('../connection')

const { makeStandCombatObject, makeStandMoveObject } = require('../../functions')

// Basic, attributes, abilitys vão ser passados pela requisição, o resto vai ser feito automático
const StandSchema = new mongoose.Schema({
    charId: { type: mongoose.Types.ObjectId, required: true },
    basic: {
        name: String,
        standType: String,
        weakPoint: String,
        img: String,
    },
    attributes: {
        strengh: { type: Number, min: 0, max: 5 },
        speed: { type: Number, min: 0, max: 5 },
        durability: { type: Number, min: 0, max: 5 },
        precision: { type: Number, min: 0, max: 5 },
        range: { type: Number, min: 0, max: 5 },
        development: { type: Number, min: 0, max: 5 }
    },
    abilitys: {
        firstMain: {
            name: String,
            effect: String,
            dice: String,
            description: String,
        },
        secondMain: {
            name: String,
            effect: String,
            dice: String,
            description: String,
        },
        passive: {
            name: String,
            effect: String,
            dice: String,
            description: String,
        }
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
    acts: {
        act1: {
            img: String,
            attributes: {
                strengh: { type: Number, min: 0, max: 5 },
                speed: { type: Number, min: 0, max: 5 },
                durability: { type: Number, min: 0, max: 5 },
                precision: { type: Number, min: 0, max: 5 },
                range: { type: Number, min: 0, max: 5 },
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
        },
        act2: {
            img: String,
            attributes: {
                strengh: { type: Number, min: 0, max: 5 },
                speed: { type: Number, min: 0, max: 5 },
                durability: { type: Number, min: 0, max: 5 },
                precision: { type: Number, min: 0, max: 5 },
                range: { type: Number, min: 0, max: 5 },
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
        },
        act3: {
            img: String,
            attributes: {
                strengh: { type: Number, min: 0, max: 5 },
                speed: { type: Number, min: 0, max: 5 },
                durability: { type: Number, min: 0, max: 5 },
                precision: { type: Number, min: 0, max: 5 },
                range: { type: Number, min: 0, max: 5 },
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
        },
        act4: {
            img: String,
            attributes: {
                strengh: { type: Number, min: 0, max: 5 },
                speed: { type: Number, min: 0, max: 5 },
                durability: { type: Number, min: 0, max: 5 },
                precision: { type: Number, min: 0, max: 5 },
                range: { type: Number, min: 0, max: 5 },
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
        }
    }
})
StandSchema.pre('save', function(next) {
    const { basic, attributes } = this

    if (basic.standType !== 'act') {
        this.combat = makeStandCombatObject(attributes)
        this.move = makeStandMoveObject(attributes)
    } else {
        Object.keys(this.acts).forEach(actNum => {
            this.acts[actNum].combat = makeStandCombatObject(this.acts[actNum].attributes)
            this.acts[actNum].move = makeStandMoveObject(this.acts[actNum].attributes)
        })
    }
    next()
})

const Stand = mongoose.model('Stand', StandSchema)

module.exports = Stand