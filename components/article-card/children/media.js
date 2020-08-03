import React from 'react';

const Media = props => {
  const { article = {}, className } = props;
  const { headline, imageUrl } = article;
  return (
    <img alt={headline} className={className} src={imageUrl} />
  );
};

export default Media;
