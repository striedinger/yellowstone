import React from 'react';
import childrenElements from './children';
import layoutOne from './layouts/one.json';
import css from './styles.module.css';

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

const article = {
  headline: "this is the headline",
  summary: "this is the summary",
  canonicalUrl: "https://google.com",
  imageUrl: "https://images.wsj.net/im-215911?width=220&height=147&pixel_ratio=2",
};

const ArticleCard = props => {
  return (
    <article className={css.article}>
      {renderTree(layoutOne, article)}
    </article>
  );
};

export default ArticleCard;
