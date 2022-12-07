const similarity = require('compute-cosine-similarity');
const OpenAI = require('openai-api');

const function_one = async (x: string) => {
    const time_now = Date.now()
    const openai = new OpenAI('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');
    const sentenceA = x;
    const initialList = ["I like it when it pours in the morning", "In the morning, I like the rain", "I like horses", "I like cats", "I like it when it's raining in the morning", "I feel like it's cold outside", "I like it when it shines in the morning"];
    const totalList = initialList.push(sentenceA);
    let vectorList = [];
    let cosSims:any = [];

    for (var i of initialList){
      const gptResponse1 = await openai.embeddings({
        "engine": "text-similarity-davinci-001",
        "input": [
          i
        ],
      });

      vectorList.push(gptResponse1.data.data[0].embedding);
    }

    const gptResponse2 = await openai.embeddings({
      "engine": "text-similarity-davinci-001",
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
    initialList.forEach((num1, index) => {
      const num2 = cosSims[index];
      finalList.push({"Phrase":num1,"Similarity":num2})
      console.log(finalList)
    })

    const time_after = Date.now()

    console.log((time_after-time_now)/1000 + " Seconds")
  
}


/*
const function_one = async (x:string) => {
    return x + " Hello";
}
*/
module.exports = function_one;


