const mongoose = require('../connection')

// Funções para calcular atributos
const { makeCombatObject } = require('../../functions')
const configs = require('../../configs/limiters.json')

/* Schema do Personagem */
const CharacterSchema = new mongoose.Schema({
    playerId: mongoose.Schema.Types.ObjectId,
    basic: {
        name: { type: String, required: true },
        age: { type: Number, required: true, min: 20 },
        race: { type: String, required: true },
        fightStyle: String,
        occupation: { type: String, required: true },
    },
    attributes: {
        strengh: Number,
        dexterity: Number,
        constituition: Number,
        education: Number,
        mentality: Number,
        social: Number,
    },
    specialitys: {
        strengh: {
            athletics: Boolean,
            jump: Boolean,
            fight: Boolean,
            climb: Boolean
        },
        dexterity: {
            acrobacy: Boolean,
            stealth: Boolean,
            aim: Boolean,
            dodge: Boolean,
            reflex: Boolean,
        },
        constituition: {
            force: Boolean,
            imunity: Boolean,
            painResistence: Boolean
        },
        education: {
            history: Boolean,
            geography: Boolean,
            math: Boolean,
            investigation: Boolean,
            forensic: Boolean,
            tecnology: Boolean,
            sociology: Boolean,
            art: Boolean,
            physics: Boolean,
            chemistry: Boolean,
            foreignLanguage: Boolean,
            programming: Boolean,
            policy: Boolean,
            religion: Boolean,
            mechanic: Boolean,
            biology: Boolean,
            medicine: Boolean,
        },
        mentality: {
            perception: Boolean,
            insight: Boolean,
            mindResistence: Boolean
        },
        social: {
            intimidation: Boolean,
            cheating: Boolean,
            acting: Boolean,
            charm: Boolean,
            sexy: Boolean,
            persuasion: Boolean,
        },
    },
    combat: {
        life: Number,
        actualLife: Number,
        mentalEnergy: Number,
        actualMentalEnergy: Number,
        movement: Number,
        da: Number,
    },
    abilitys: {
        race: [{ name: String, description: String }],
        fightStyle: [{ name: String, description: String }],
    },
    level: {
        actualLevel: { type: Number, default: 1, min: 1, max: configs.maxLevel },
        maxXP: { type: Number, default: configs.xpTable[0] },
        actualXP: { type: Number, default: 0 }
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

CharacterSchema.pre('save', function(next) {
    // Separando atributos e especialidades
    const { attributes, specialitys } = this
    this.combat = makeCombatObject(attributes, specialitys, 'player')
    next()
})
CharacterSchema.pre('updateOne', async function(next) {
    // const thisChar = await this.model.findOne(this.getQuery());
    const updateObj = this.getUpdate()  // Pego as informações novas

    // Separando atributos e especialidades
    const { attributes, specialitys } = updateObj
    if (attributes || specialitys) {
        this.set({  // Coloco o novo objeto dentro do Schema a ser salvo
            combat: makeCombatObject(attributes, specialitys, 'player')
        })
    } else {
        this.set(updateObj)
    }
    next()
})

const Character = mongoose.model('Character', CharacterSchema)

module.exports = Character