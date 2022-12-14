export const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat, GraphQLNonNull} = graphql;
const SentenceType = require('.././Schemas/TypeDefs/SentenceType')
const Sentence = require('../models/sentence_model');
const similarity = require('compute-cosine-similarity');
const OpenAI = require('openai-api');

let sentsArray:String[] = []
let objectArray:any[] = []
//let listOfSents:String[] = []
//let idArray:Number[] = [];

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getSents: {
            type: new GraphQLList(SentenceType),
            //args: {text: {name: "text", type: GraphQLString}, ranking: {name: "ranking", type: GraphQLInt}},
            resolve: async function(parent:any, args:any) {
                let newRantArray:any[] = []
                let newRantArray2:any[] = []
                let basicRantArray:any[] = []
                let otherRantArray:any[] = []
                let anotherRantArray:any[] = []
                let filteredList:any[] = []
                let listsWithoutEmpties: any[] = []
                let finalRantArray:any[] = []
                let whatIsThisArray:any[] = []
                let whateverArray:any[] = []
                let someArray:any[] = []
                let someOtherArray:any[] = []
                let totalSimRant:any[] = []
                let totalSimRant2:any[] = []
                let finalFilteredList3:any[] = []
                let finalFilteredList4:any[] = []

                // Select only unique values in an array
                const distinct = (value:any,index:any,self:any) => {
                    return self.indexOf(value) == index;
                }

                // Remove an Array from a list of arrays
                function arrayRemove(arr:any, value:any) { 
    
                    return arr.filter(function(ele:any){ 
                        return ele != value; 
                    });
                }

                // Rants sorted by sum of the rankings (text of word listed)
                const rants0 = await Sentence.aggregate([{$unwind:{path:"$similarities"}},{$unwind:{path:"$similarities.Text"}},{"$group":{"_id":"$similarities.Text","Ranking":{"$sum":"$similarities.Ranking"}}},{$sort: { "Ranking": -1 }}]);
                // Rants sorted by sum of the rankings (id of word listed)
                const rants = await Sentence.aggregate([{$unwind:{path:"$similarities"}},{$unwind:{path:"$similarities.Text"}},{"$group":{"_id":"$similarities.ObjectId","Ranking":{"$sum":"$similarities.Ranking"}}},{$sort: { "Ranking": -1 }}]);
                // List all rants
                const rants3 = await Sentence.find();

                // Array of all texts ordered by rating
                for (var k of rants0){
                    totalSimRant.push(k)
                }

                // Array of all ids ordered by rating

                for (var m of totalSimRant){
                    totalSimRant2.push(m._id)
                }
                
                // Obtain list of texts that received no votes (Ranking of 0)

                for (let i=0; i < rants3.length; i++){
                    if (rants3[i].listSents.length > 0){
                        whateverArray.push(rants3[i].text)
                        for (var j of whateverArray){
                            const noVotes = await Sentence.aggregate([{$unwind:{path:"$similarities"}},{$match: {text:j}},{"$group":{"_id":null,"Ranking":{"$sum":"$similarities.Ranking"}}}])
                            if (noVotes[0].Ranking === 0){
                                someArray.push(j)
                            }
                        }
                        someOtherArray = someArray.filter(distinct)
                    }
                }
                
                // Add texts with no votes to main array

                for (var k of someOtherArray){
                    const noVoteRants = await Sentence.find({"text":k});
                    basicRantArray.push(noVoteRants[0])
                }
                
                // Add ids that received some votes to an array 

                for (let i=0; i < rants.length; i++){
                    if (rants[i].Ranking >= 0){
                        const rants2 = await Sentence.find({"_id":rants[i]});
                        newRantArray.push(rants2[0])
                    }
                }
                
                // Add texts that received some votes to an array 

                for (let i=0; i < rants0.length; i++){
                    if (rants0[i].Ranking >= 0){
                        const rants4 = await Sentence.find({"text":rants0[i]});
                        newRantArray2.push(rants4[0].text)
                    }
                }
                
                // Add texts containing no similar elements to main array, or else create an array of similar sentences and an array of of the total objects 

                for (let i=0; i < rants3.length; i++){
                    if (rants3[i].listSents.length === 0 && totalSimRant2.includes(rants3[i].text) === false){
                        basicRantArray.push(rants3[i])
                    } else {
                        otherRantArray.push(rants3[i].listSents)
                        anotherRantArray.push(rants3[i])
                    }
                }
            
                // Sort each list of similar sentences to reflect the ordering of the list of sentences that received rankings

                for (var d of otherRantArray){
                    filteredList.push(d.sort((a:any, b:any) => newRantArray2.indexOf(a) - newRantArray2.indexOf(b)));
                }

                // Remove empty lists from total array

                for (var g of filteredList){
                    if (g.length > 0){
                        listsWithoutEmpties.push(g)
                    }
                }

                // Add fist element of each array to another array
                
                for (var g of filteredList){
                    if (g.length > 0){
                        whatIsThisArray.push(g[0])
                    }
                }

                // Remove duplicates
                
                const finalFilteredList = whatIsThisArray.filter(distinct)

                // Remove sentences that get supplanted later by other sentences 
                
                for (let i = 0; i < listsWithoutEmpties.length; i++){
                    for(let j = 0; j < finalFilteredList.length; j++){
                        if (listsWithoutEmpties[i].includes(finalFilteredList[j]) === true && finalFilteredList[j] !== listsWithoutEmpties[i][0]){
                            const finalFilteredList2 = arrayRemove(finalFilteredList, finalFilteredList[j])
                            finalFilteredList3.push(finalFilteredList2)
                        } else {
                            finalFilteredList4.push(finalFilteredList)
                        }
                    }
                }

                // Add final list of sentences to an array                
                
                if (finalFilteredList3.length !== 0) {
                    for (let i=0; i < finalFilteredList3[0].length; i++){
                        const rants5 = await Sentence.find({"text":finalFilteredList3[0][i]});
                        finalRantArray.push(rants5[0])
                    }
                } else if (finalFilteredList4.length !== 0) {
                    for (let i=0; i < finalFilteredList4[0].length; i++){
                        const rants6 = await Sentence.find({"text":finalFilteredList4[0][i]});
                        finalRantArray.push(rants6[0])
                    }
                }
  
                // Combine all sentences
                
                for (let i=0; i < finalRantArray.length; i++){
                    basicRantArray.push(finalRantArray[i])
                }
                
                return basicRantArray
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addSentence: {
            type: SentenceType,
            args: {
                text: {
                    name: 'text',
                    type: GraphQLString
                }
            },
            resolve: async function(root:any,params:any) {
                //sentenceData.push({id: sentenceData.length + 1, sentence: args.sentence, score: args.sentence})
                const sentence = new Sentence(params);
                const newSentence = await sentence.save();
                console.log(sentsArray);
                return newSentence;
            }
        },

        updateSentence: {
            type: SentenceType,
            args: {
                ID: {
                    name: 'ID',
                    //type: new GraphQLNonNull(GraphQLString)
                    type: GraphQLInt
                },
                text: {
                    name: 'text',
                    type: GraphQLString
                },
                otherId: {
                    name: 'otherId',
                    type: GraphQLString
                },
                ranking: {
                    name: 'ranking',
                    type: GraphQLInt
                }
            },
            resolve: async function(root:any,param:any) {
                const uSentence = await Sentence.updateOne({"ID":param.ID, "similarities.ObjectId":param.otherId}, {$set : {"similarities.$.Ranking": param.ranking += 1}}, {new: true})
                return uSentence;
            }
        },

        sentenceSimilarities: {
            type: SentenceType,
            args: {
                ID: {
                    name: 'ID',
                    type: GraphQLInt
                },
                text: {
                    name: 'text',
                    type: GraphQLString
                },
                listSents: {
                    name: "list",
                    type: new GraphQLList( new GraphQLList(GraphQLString))
                },
                similarities: {
                    name: 'similarities',
                    type: new GraphQLList( new GraphQLList(GraphQLString))
                }                 
            },
            resolve: async function(root:any,param:any) {
                //sentenceData.push({id: sentenceData.length + 1, sentence: args.sentence, score: args.sentence})

                const time_now = Date.now()

                for (let i=0; i < objectArray.length+1; i++){
                    param.ID = i
                }

                const distinct = (value:any,index:any,self:any) => {
                    return self.indexOf(value) == index;
                }

                const openai = new OpenAI('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');
                const sentenceA = param.text;
                const initialList = sentsArray.filter(distinct);
                //const totalList = initialList.push(sentenceA);
                let vectorList = [];
                let cosSims:any = [];

                for (var sents of initialList){
                const gptResponse1 = await openai.embeddings({
                    "engine": "text-similarity-ada-001",
                    "input": [
                    sents
                    ],
                });

                vectorList.push(gptResponse1.data.data[0].embedding);
                }

                const gptResponse2 = await openai.embeddings({
                "engine": "text-similarity-ada-001",
                "input": [
                    sentenceA
                ],
                });
            
                const initialVector = gptResponse2.data.data[0].embedding;

                //const allVectors:any = vectorList.push(initialVector);

                for (var j of vectorList){
                    var s = similarity(initialVector,j)
                    cosSims.push(s);
                }

                let finalList:any = []
                let similarSentsList:any = []
                let id:any = []
                let val = 0
                initialList.forEach((phrase:any, index:any) => {
                const cosSim = cosSims[index];
                const objId = objectArray[index];
                //const idId = idArray[index]
                if (cosSim > 0.85){
                    finalList.push({"Text":phrase,"Similarity":cosSim,"ObjectId":objId,"Ranking":0})
                    similarSentsList.push(phrase)
                }
                })

                //console.log(finalList)

                //similarSentsList.push(sentenceA)

                const finalList_ordered = finalList.sort(function(a:any,b:any){return a.Similarity - b.Similarity})

                param.similarities = finalList_ordered

                param.listSents = similarSentsList

                //console.log(similarSentsList);

                sentsArray.push(sentenceA);

                const sentence = await new Sentence(param);
                const newSentence = await sentence.save();

                objectArray.push(newSentence._id)
                //idArray.push(newSentence.ID)

                //listOfSents.push(newSentence.listWords)

                const time_after = Date.now()
                console.log((time_after-time_now)/1000 + " Seconds")

                return newSentence

            }
        }

    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})
