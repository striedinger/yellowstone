import React from 'react';

const Headline = props => {
  const { article = {}, className, tag: Tag = 'h2' } = props;
  const { canonicalUrl, headline } = article;
  return (
    <Tag className={className}>
      <a href={canonicalUrl}>{headline}</a>
    </Tag>
  );
};

export default Headline;
