const express = require('express');
const app = express();
const PORT = 4000;
const {graphqlHTTP} = require('express-graphql');
const schema = require('../Schemas/index');
const cors = require('cors');
const mongoose = require('mongoose')
const Sentence = require('../models/sentence_model')

async function startServer() {
    app.use(cors())

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    await mongoose.connect('mongodb+srv://joespags9:Ben04Riley06@cluster0.kvtzb.mongodb.net/Sentences_Two?retryWrites=true&w=majority')

    app.listen(PORT, () => {
        console.log("Server running")
    });
}
startServer();