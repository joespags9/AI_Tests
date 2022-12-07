export const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    playerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sentence: {
        type: String,
        required: true  
    },
    list:{
        type: [String]
    }
})

const Player = mongoose.model('player', PlayerSchema);
module.exports = Player;