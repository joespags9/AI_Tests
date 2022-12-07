export const graphql = require('graphql');
export const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat} = graphql;

const MasterArray = new GraphQLObjectType({
    name: "MasterArray",
    fields: () => ({
        sentence: {type: GraphQLString},
        list_sentence: {type: new GraphQLList(GraphQLString)}
    })
})

module.exports = MasterArray;