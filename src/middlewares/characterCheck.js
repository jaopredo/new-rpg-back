const Player = require("../db/schemas/PlayerSchema")
const Character = require("../db/schemas/CharacterSchema")

module.exports = async (req, res, next) => {
    const player = await Player.findById(req.id)
    
    next()
}