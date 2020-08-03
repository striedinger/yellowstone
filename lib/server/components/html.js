import React from 'react';

const HTML = props => {
  const { children, css = [], scripts = [] } = props;
  return (
    <html lang="en">
      <head>
        <title>Yellowstone</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: `
          body { margin: 0 }
        ` }}/>
        {css.filter(Boolean).map(href => {
          return <link key={href} rel="stylesheet" href={href}></link>
        })}
      </head>
      <body>
        <div id="app">{children}</div>
        {scripts.filter(Boolean).map(src => {
          return <script key={src} src={src}></script>
        })}
      </body>
    </html>
  );
};

export default HTML;
