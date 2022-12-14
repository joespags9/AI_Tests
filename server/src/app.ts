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

    await mongoose.connect(<MONGO_INFO>)

    app.listen(PORT, () => {
        console.log("Server running")
    });
}
startServer();
