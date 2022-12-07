import React, {useState, useEffect} from 'react'
import { FIND_SIMILARITIES } from '../GraphQL/Mutations';
import { MODIFY_SENTENCE } from '../GraphQL/Mutations';
//import { ADD_SENTENCE } from '../GraphQL/Mutations';
import { LOAD_SENTENCES } from '../GraphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import { validate } from 'graphql';

const Form = () => {
    
    const [text, setText] = useState("");
    const [similarText, setSimilarText] = useState<any[]>([]);
    const [list, addList] = useState<any>([]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [finalText, setFinalText] = useState<any[]>([]);
    //const [value,setValue] = useState();

    const[addSentence, {error, data, loading}] = useMutation(FIND_SIMILARITIES);
    const[addRankings] = useMutation(MODIFY_SENTENCE);
    const {loading: loading2, data: data2} = useQuery(LOAD_SENTENCES);

    let newSentsArray: any[] = []
    let finalSentsArray: any[] = []
    let lastSentsArray: any[] = []

    const addSentences = (text:String, event:any) => {
        //console.log("text:", text)
        event.preventDefault();
        addSentence({
            variables:{
                text: text
            }
        });
        addList([...list,text]);

        if (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        //console.log("sents:", data)
        if(data){
            if (data.sentenceSimilarities.listSents && data.sentenceSimilarities.listSents.length > 0){
                setOpen(true)
            }
        }  
    },[data]);


    const handleClose = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };


    const addRanking = (simText:string, event:any) => {
        event.preventDefault();
        let newId: Number[] = []
        let newRank: Number[] = []
        let newObjectId: String[] = []
        let origText: any[] = []
        let simTextArray: any[] = []

        let newArray: any[] = [];
        newArray.push(data.sentenceSimilarities)
        newSentsArray.push(data.sentenceSimilarities)
        for (var j of newArray){
            for (let k=0; k < j.similarities.length; k++){
                if (simText === j.similarities[k].Text){
                    simTextArray.push(simText)
                    origText.push(j.text)
                    newId.push(j.ID)
                    newRank.push(j.similarities[k].Ranking);
                    newObjectId.push(j.similarities[k].ObjectId)
                }
            }
        }
        addRankings({
            variables:{
                text: simText,
                otherId: newObjectId[0],
                ID: newId[0],
                ranking: newRank[0]
            }
        });

        setOpen(false)

        if (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        //console.log("sents:", data)
        if(data2){
            setSimilarText(data2.getSents)
        }  
    },[data2]);

    const refresh = () => {
        window.location.reload();
    }

    const showFinal = () => {

        for (let i = 0; i < similarText.length; i++){
            finalSentsArray.push(similarText[i].text)
        }

        const distinct = (value:any,index:any,self:any) => {
            return self.indexOf(value) === index;
        }

        const finalFinalSentsArray = finalSentsArray.filter(distinct)

        for (let i = 0; i < finalFinalSentsArray.length; i++){
            lastSentsArray.push(finalFinalSentsArray[i])
        }

        setFinalText(lastSentsArray)

        setOpen2(true)
    }

    return(
        <div>
          
                <TextField
                    type = "text"
                    autoComplete = "off"
                    placeholder= "Rant"
                    onChange = {(e) => {
                        setText(e.target.value);
                    }}
                />
                <Button onClick={(e) => addSentences(text,e)} variant="outlined"> Add your rant </Button>
                {loading && <span>Checking for Similar Sentences...</span>}
                <Dialog open={open} onClose={handleClose} hideBackdrop = {true}>
                    <DialogTitle>Is your sentence similar to any of these?</DialogTitle>
                    <DialogContent sx = {{width:"200px"}}>
                        {data?.sentenceSimilarities?.listSents.map((b:any) =>
                            <div>
                                <ul>{b}</ul>
                                <Button onClick={(e) => {addRanking(b,e)}}> Is this sentence most similar? </Button>
                            </div>
                        )}
                        <Button onClick={handleClose}> None of these are similar </Button>
                    </DialogContent>
                </Dialog>
                <Button onClick={refresh} variant="outlined"> Enter results </Button>
                <Button onClick={showFinal} variant="outlined"> Show final sentences </Button>
                <Dialog open={open2} onClose={handleClose2} hideBackdrop = {true}>
                    <DialogTitle>Final sentences</DialogTitle>
                    <DialogContent sx = {{width:"200px"}}>
                        {finalText.map((c:any) =>
                            <div>
                                <ul>{c}</ul>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

            {
                list.map((a:any) => <div>
                    <ul>{a}</ul>
                </div>)
            }


        </div>
    )
}

export default Form