require('dotenv').config()
const { sign } = require('jsonwebtoken')

const {
    calcLife,
    calcMentalEnergy,
    calcSuccessDifficult,
    calcMovement
} = require('./charCombat')

module.exports = {
    sendStatus: (sts, msg) => ({
        error: !sts,
        msg: msg?msg:sts?"Operação bem-sucedida":"Algo de errado ocorreu!"
    }),
    generateToken: (params = {}) => sign(params, process.env.APP_HASH, {
        expiresIn: 3.156e+7
    }),
    makeCombatObject: function (attributes, specialitys, charType='player') {
        const {
            strengh: strenghSpecs,  // Especialidades de Força
            dexterity: dexSpecs,
            constituition: constSpecs,  // Especialidades de Constituição
            mentality: mentSpecs, // Especialidades de Vigilância
        } = specialitys
    
        // Calculando Vida
        const life = calcLife(
            attributes.constituition,  // Passo minha constituição
            constSpecs?.painResistence,
            constSpecs?.imunity,
            constSpecs?.force,
        )
        // Nota: A exclamação serve para indicar que, se constSpecs não for UNDEFINED, eu passo o atributo 'painResistence'
    
        // Calculando Energia Mental
        const mentalEnergy = calcMentalEnergy(
            attributes.mentality,
            mentSpecs?.mindResistence,
            constSpecs?.force
        )
    
        // Calculando Dificuldade do Acerto
        const successDifficult = calcSuccessDifficult(
            attributes.dexterity,
            dexSpecs?.dodge,
            dexSpecs?.reflex
        )
    
        // Calculando Movimento
        const movement = calcMovement(
            attributes.strengh,
            attributes.dexterity,
            strenghSpecs?.athletics,
            strenghSpecs?.jump
        )
    
        return {
            life: charType==='npc'?life*7:charType==='boss'?life*12:life,
            actualLife: charType==='npc'?life*7:charType==='boss'?life*12:life,
            mentalEnergy: mentalEnergy,
            actualMentalEnergy: mentalEnergy,
            movement: movement,
            da: successDifficult,
            shield: 0
        }
    }
}