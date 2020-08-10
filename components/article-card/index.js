import React from 'react';
import childrenElements from './children';
import css from './styles.module.css';

const layouts = {
  feed: require('./layouts/feed.json'),
  simple: require('./layouts/simple.json'),
  'media-simple': require('./layouts/media-simple.json'),
};

const renderTree = (json, article) => {
  return json.map((element, index) => {
    const Element = childrenElements[element.type];
    const children = element.children && renderTree(element.children, article) || null;
    const options = {
      ...element.options,
      article,
      className: css[element.type],
    };
    return (
      <Element key={index} {...options}>
        {children}
      </Element>
    );
  });
};

const ArticleCard = props => {
  const { article, layout: selectedLayout = 'simple' } = props;
  if (!article) return null;
  if (!layouts[selectedLayout]) return null;
  return (
    <article className={css.article}>
      {renderTree(layouts[selectedLayout], article)}
    </article>
  );
};

export default ArticleCard;
