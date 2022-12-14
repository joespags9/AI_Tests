import { gql } from '@apollo/client';

export const ADD_SENTENCE = gql`
  mutation addSentence($text: String!) {
    addSentence(text: $text) {
      text
    }
  }
`;

export const MODIFY_SENTENCE = gql`
  mutation updateSentence($text: String, $otherId: String, $ID: Int, $ranking: Int) {
    updateSentence(text: $text, otherId: $otherId, ID: $ID, ranking: $ranking) {
      text
    }
  }
`;

export const FIND_SIMILARITIES = gql`
  mutation sentenceSimilarities($text: String) {
    sentenceSimilarities(text: $text) {
      ID
      text
      listSents
      similarities {
        Text
        Similarity
        Ranking
        ObjectId
      }
    }
  }
`;
