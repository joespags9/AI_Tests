import React, { useState, useEffect } from 'react';
import { FIND_SIMILARITIES } from '../GraphQL/Mutations';
import { MODIFY_SENTENCE } from '../GraphQL/Mutations';
//import { LOAD_SENTENCES } from '../GraphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const SimButtons = (simText: String, event: any) => {
  const [text, setText] = useState('');
  const [addRankings, { error, data, loading }] = useMutation(MODIFY_SENTENCE);

  const addRanking = (simText: String, event: any) => {
    event.preventDefault();
    addRankings({
      variables: {
        text: simText,
      },
    });
  };
};

export default SimButtons;
