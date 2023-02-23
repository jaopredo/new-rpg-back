const mongoose = require('../connection')

const PlayerSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    charList: [ mongoose.SchemaTypes.ObjectId ],
    standList: [ mongoose.SchemaTypes.ObjectId ],
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player