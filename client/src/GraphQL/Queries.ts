import { gql } from '@apollo/client';

export const LOAD_SENTENCES = gql`
  query {
    getSents {
      ID
      text
      listSents
      display
      similarities {
        Text
        Similarity
        ObjectId
        Ranking
      }
    }
  }
`;

export const SET_ARRAYS = gql`
  query {
    setArrays {
      ID
      text
      listSents
      display
      similarities {
        Text
        Similarity
        ObjectId
        Ranking
      }
    }
  }
`;
