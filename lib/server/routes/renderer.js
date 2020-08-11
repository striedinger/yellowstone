import express from 'express';
import { performance, PerformanceObserver } from 'perf_hooks';
import fetch from 'cross-fetch';
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { gql, ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
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

const apolloClient = () => {
  return new ApolloClient({
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
}

// Middleware for author pages
router.get('/author/:id', (req, res, next) => {
  const { id } = req.params;
  const client = apolloClient();
  client.query({ 
    query: gql`
      { author(seoName:"${id}") {
          byline, title,
        }
      }
    `
  }).then(response => {
    return next();
  }).catch(error => {
    console.error(error);
    return res.sendStatus(404);
  });
});

// Catch all for all React rendered pages
router.get('*', (req, res) => {

  // Check for valid routes on our base routes file
  const matchedRoute = routes.some(route => matchPath(req.path, route));

  // If no route found, return 404
  if (!matchedRoute) return res.sendStatus(404);

  // Code splitting setup
  const statsFile = `${paths.clientBuild}/loadable-stats.json`;
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['bundle'] });

  // Apollo client instantiation, created per request to avoid stale data
  const client = apolloClient();

  // Extracting chunks from page
  const WrappedApp = extractor.collectChunks(
    <ApolloProvider client={client}>
      <Router location={req.url} context={routerContext}>
        <App />
      </Router>
    </ApolloProvider>
  );

  performance.mark('renderToStringWithData');
  // rendering page's HTML and fetching required data
  renderToStringWithData(WrappedApp).then(content => {
    // Extracting script, style, and link tags to inject into HTML document
    const scriptTags = extractor.getScriptElements();
    const styleTags = extractor.getStyleElements();
    const linkTags = extractor.getLinkElements();
    const initialState = client.extract();
    // Rendering our page's HTML into a custom HTML document component
    const html = renderToString(
      <Html
        links={linkTags}
        styles={styleTags}
        scripts={scriptTags}
        content={content}
        state={initialState}
      />
    );
    performance.mark('renderToStringWithDataEnd');
    res.send(`<!doctype html>\n${html}`);
    performance.measure('renderToStringWithData', 'renderToStringWithData', 'renderToStringWithDataEnd');
    performance.clearMarks();
    return res.end();
  });
});

const measureObserver = new PerformanceObserver(items => {
  items.getEntries().forEach(item => {
    console.info(`${item.name}: ${item.duration}`);
  }); 
});

measureObserver.observe({ entryTypes: ['measure'] });

export default router;
