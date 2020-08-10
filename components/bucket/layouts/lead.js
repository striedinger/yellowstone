import React from 'react';
import ArticleCard from '../../article-card';
import css from './styles.module.css';

const Lead = props => {
  const { articles } = props;
  if (!Array.isArray(articles) || articles.length === 0 ) return null;
  return (
    <div className={css.container}>
      <div className={css.column}>
        <ArticleCard article={articles[0]} layout="simple" />
        <ArticleCard article={articles[1]} layout="simple" />
        <ArticleCard article={articles[2]} layout="simple" />
        <ArticleCard article={articles[2]} layout="simple" />
        <ArticleCard article={articles[2]} layout="simple" />
      </div>
      <div className={css['lead-column']}>
        <ArticleCard article={articles[3]} layout="media-simple" />
        <div className={`${css.container} ${css.inner}`}>
          <div className={css.column}>
            <ArticleCard article={articles[4]} layout="media-simple" />
          </div>
          <div className={css.column}>
            <ArticleCard article={articles[5]} layout="media-simple" />
          </div>
        </div>
        <div className={css.container}>
          <div className={css.column}>
            <ArticleCard article={articles[5]} layout="feed" />
            <ArticleCard article={articles[5]} layout="feed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lead;
