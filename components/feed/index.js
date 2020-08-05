import React from 'react';
import { gql, useQuery } from '@apollo/client';
import ArticleCard from '../article-card';
import css from './styles.module.css';

const GET_ARTICLES = gql`
  query Feed($count: Int, $page: Int) {
    articles(count: $count, page: $page) {
      canonicalUrl,
      headline,
      summary,
      image {
        url,
        caption
      }
    }
  }
`;

const Feed = () => {
  const count = 10;
  const { data, fetchMore, loading } = useQuery(GET_ARTICLES, {
    variables: {
      page: 0,
      count,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { articles = [] } = data || {};
  const loadMore = event => {
    fetchMore({
      variables: {
        page: data.articles.length / count
      }
    });
  };
  return (
    <div className={css.feed}>
      {articles.map((article, index) => {
        return <ArticleCard key={index} article={article} />
      })}
      <button onClick={loadMore} className={css.button} disabled={loading}>{loading ? 'Loading' : 'Load more'}</button>
    </div>
  );
};

export default Feed;
