import React from 'react';
import {
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  HttpLink, 
  from
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import GetSentences from './Components/GetSentences';
import Form from './Components/Form';

const link = from([
  new HttpLink({uri: "http://localhost:4000/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      {" "} 
      {/* <GetSentences/> */}
      <Form />
    </ApolloProvider>
  );
}

export default App;
