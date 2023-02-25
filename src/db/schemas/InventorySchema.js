const mongoose = require('../connection');

/* SCHEMA DO ITEM */
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    weight: { type: Number, required: true },
    weapon: { type: Boolean, default: false },
    details: { type: String, default: "" },
    damage: String,
    tipo: String,
    range: String,
});

/* SCHEMA DO INVENTÁRIO */
const InventorySchema = new mongoose.Schema({
    charId: mongoose.Types.ObjectId,
    items: [ ItemSchema ]
});


// Criando os dois documentos
const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory