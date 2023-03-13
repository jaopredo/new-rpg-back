const mongoose = require('../connection')

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    charList: [ mongoose.SchemaTypes.ObjectId ],
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player