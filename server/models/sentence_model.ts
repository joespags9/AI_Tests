export const mongoose = require('mongoose');

const SentenceSchema = new mongoose.Schema({
    ID: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    chatComments: {
        type: [String],
        default: []
    },
    gameId: {
        type: String,
        default: null
    },
    rant: {
        type: String,
        default: null
    },
    rantId:{
        type: String,
        default: null
    },
    userId:{
        type: String,
        default: null
    },
    text:{
        type: String,
        required: true  
    },
    listSents:{
        type: [String]
    },
    similarities: {
        type: [{
            "Text": String,
            "Similarity": Number,
            "ObjectId": mongoose.Schema.Types.ObjectId,
            "Ranking": Number
        }]
    },
    display: {
        type: Number,
        default: 0
    }
})

const Sentence = mongoose.model('sentence', SentenceSchema);
module.exports = Sentence;
