export const graphql = require('graphql');
export const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat} = graphql;

const SimilarityType = new GraphQLObjectType({
    name: "Similarity",
    fields: () => ({
        //id: {type: GraphQLInt},
        Text: {type: GraphQLString},
        Similarity: {type: GraphQLFloat},
        ObjectId: {type: GraphQLString},
        Ranking: {type: GraphQLInt}
    })
})

module.exports = SimilarityType;