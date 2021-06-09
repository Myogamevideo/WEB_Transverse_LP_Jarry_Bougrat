import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

client.query({
    query: gql`
    query Assert{
      userSchemaAssert
    } 
    `
})
    .then(result => console.log("Reponse from graphql:", result));

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={ client }>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();