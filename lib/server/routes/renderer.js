import express from 'express';
import React from 'react';
import fetch from 'cross-fetch';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { concatPagination } from "@apollo/client/utilities";
import Html from '../components/html';
import App from '../../shared/App';

const router = express.Router();

router.get('/', (req, res) => {
  const { locals } = res;
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: 'https://geeql.vercel.app/',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            articles: concatPagination(),
          }
        }
      }
    }),
  });
  const WrappedApp = (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  renderToStringWithData(WrappedApp).then(content => {
    const initialState = client.extract();
    const html = renderToString(
      <Html
        css={[locals.assetPath('bundle.css')]}
        scripts={[locals.assetPath('vendor.js'), locals.assetPath('bundle.js')]}
        content={content}
        state={initialState}
      />
    );
    res.send(`<!doctype html>\n${html}`);
    res.end();
  });
});

export default router;
