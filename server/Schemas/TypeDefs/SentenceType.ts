export const graphql = require('graphql');
export const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat, GraphQLBoolean} = graphql;
const SimilarityType = require('./SimilarityType');
const MasterArray = require('./MasterArray')

const SentenceType = new GraphQLObjectType({
    name: "Sentence",
    fields: () => ({
        //playerID: {type: GraphQLString},
        ID: {type: GraphQLInt},
        likes: {type: GraphQLInt},
        chatComments: {type: new GraphQLList(GraphQLString)},
        gameId: {type: GraphQLString},
        rant: {type: GraphQLString},
        rantId: {type: GraphQLString},
        userId: {type: GraphQLString},
        text: {type: GraphQLString},
        listSents: {type: new GraphQLList(GraphQLString)},
        similarities: {type: new GraphQLList(SimilarityType)},
        display: {type: GraphQLInt}
    })
})

module.exports = SentenceType;
