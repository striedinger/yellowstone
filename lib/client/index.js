import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'cross-fetch';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { concatPagination } from "@apollo/client/utilities";
import App from '../shared/App';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: concatPagination(),
        }
      }
    }
  }).restore(window.__APOLLO_STATE__),
  link: createHttpLink({
    uri: 'https://geeql.vercel.app/',
    fetch,
    credentials: 'same-origin',
  }),
});

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
