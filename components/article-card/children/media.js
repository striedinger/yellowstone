import React from 'react';

const Media = props => {
  const { article = {}, className } = props;
  const { image: { url, caption } } = article;
  return (
    <img alt={caption} className={className} src={url} />
  );
};

export default Media;
