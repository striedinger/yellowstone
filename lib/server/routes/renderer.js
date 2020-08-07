import express from 'express';
import fetch from 'cross-fetch';
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { concatPagination } from "@apollo/client/utilities";
import { matchPath } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import routes from '../../../routes';
import Html from '../components/html';
import App from '../../shared/App';
import paths from '../../../config/paths';

const router = express.Router();

const routerContext = {};

router.get('*', (req, res) => {
  const { locals } = res;

  const matchedRoute = routes.some(route => matchPath(req.path, route));

  if (!matchedRoute) return res.sendStatus(404);

  const statsFile = `${paths.clientBuild}/loadable-stats.json`;
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['bundle'] });

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: process.env.PUBLIC_GQL_SERVER,
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
  const WrappedApp = extractor.collectChunks(
    <ApolloProvider client={client}>
      <Router location={req.url} context={routerContext}>
        <App />
      </Router>
    </ApolloProvider>
  );
  renderToStringWithData(WrappedApp).then(content => {
    const scriptTags = extractor.getScriptElements();
    const styleTags = extractor.getStyleElements();
    const linkTags = extractor.getLinkElements();
    const initialState = client.extract();
    const html = renderToString(
      <Html
        links={linkTags}
        styles={styleTags}
        scripts={scriptTags}
        content={content}
        state={initialState}
      />
    );
    res.send(`<!doctype html>\n${html}`);
    res.end();
  });
});

export default router;
