import React, {useEffect, useState} from 'react'
import { useQuery, gql, useSubscription } from '@apollo/client';
import { LOAD_SENTENCES } from '../GraphQL/Queries';

const GetSentences = () => {
    const {loading, data} = useQuery(LOAD_SENTENCES)
    const [sents, setSents] = useState<any[]>([])

    useEffect(() => {
        if(data) {
            setSents(data.getSents);
        }
        
    }, [data]);

    //console.log(data.sentences)

    return ( 
        <div>
            {" "}
            {sents.map((val) => {
                console.log(val.similarities[1]);
                return <h1>{val.sentence}</h1>
            })}
        </div>
        
    );
}

export default GetSentences;