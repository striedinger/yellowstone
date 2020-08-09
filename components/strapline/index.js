import React from 'react';
import css from './styles.module.css';
import rightArrow from './right-arrow.svg';

const Strapline = props => {
  const { link, tag: Tag = 'h2', title, useIcon } = props;
  if (!title) return null;
  const titleContent = (
    <React.Fragment>
      <span dangerouslySetInnerHTML={{ __html: title }} className={css.title} />
      { link && useIcon && <img src={rightArrow} className={css.icon} /> }
    </React.Fragment>
  );
  const linkContent = (title) => {
    return <a href={link} className={css.link}>{title}</a>
  };
  return (
    <Tag className={css.strapline}>
      { link ? linkContent(titleContent) : titleContent }
    </Tag>
  );
};

export default Strapline;
