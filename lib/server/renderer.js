import React from 'react';
import { renderToString } from 'react-dom/server';
import Html from './components/html';
import App from '../shared/App';

export default ({ locals }) => {
  const html = renderToString(
    <Html
      css={[locals.assetPath('bundle.css')]}
      scripts={[locals.assetPath('vendor.js'), locals.assetPath('bundle.js')]}
    >
      <App />
    </Html>
  );
  return html;
};
