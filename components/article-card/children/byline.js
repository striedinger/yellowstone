import React from 'react';

const Byline = props => {
  const { article = {}, className } = props;
  const { authors = [] } = article;
  const authorLinks = authors
    .filter(author => author && author.seoName && author.byline)
    .map((author, index) => {
      return (
        <li key={index}>
          <a href={`/author/${author.seoName}`}>{author.byline}</a>
        </li>
      );
    })

  if (authorLinks.length === 0) return null;
  return (
    <ul className={className}>
      {authorLinks}
    </ul>
  );
};

export default Byline;
