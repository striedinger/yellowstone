import React from 'react';

const HTML = props => {
  const { content, links, state, scripts, styles } = props;
  return (
    <html lang="en">
      <head>
        <title>Yellowstone</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: `body{margin:0}` }}/>
        {links}
        {styles}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}` }} />
        {scripts}
      </body>
    </html>
  );
};

export default HTML;
