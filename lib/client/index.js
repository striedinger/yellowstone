import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'cross-fetch';
import { loadableReady } from '@loadable/component';
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
    uri: process.env.PUBLIC_GQL_SERVER,
    fetch,
    credentials: 'same-origin',
  }),
});

loadableReady(() => {
  performance.mark('beforeRender');
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>,
    document.getElementById('app'),
    markHydrateComplete,
  );
});

const markHydrateComplete = () => {
  performance.mark('afterHydrate');
  performance.measure('beforeAppHydration', null, 'beforeRender');
  performance.measure('appHydration', 'beforeRender', 'afterHydrate');
  const measures = performance.getEntriesByType('measure');
  measures.forEach(measureItem => {
    console.info(`${measureItem.name}: ${measureItem.duration}`);
  });
  clearMarks();
};

const clearMarks = () => {
  performance.clearMarks();
  performance.clearMeasures();
};

if (module.hot) {
  module.hot.accept();
}
