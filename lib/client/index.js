import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import App from '../shared/App';

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: createHttpLink({
    uri: 'https://geeql.vercel.app/',
    fetch,
    credentials: 'same-origin',
  }),
});

ReactDOM.hydrate(<App client={client} />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
