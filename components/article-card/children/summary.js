import React from 'react';

const Summary = props => {
  const { article = {}, className, tag: Tag = 'p' } = props;
  const { summary } = article;
  return (
    <Tag className={className}>{summary}</Tag>
  );
};

export default Summary;
