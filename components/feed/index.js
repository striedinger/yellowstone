import React from 'react';
import { gql, useQuery } from '@apollo/client';
import ArticleCard from '../article-card';
import css from './styles.module.css';

const GET_ARTICLES = gql`
  query Feed($count: Int, $page: Int, $sectionName: String) {
    articles(count: $count, page: $page, sectionName: $sectionName) {
      canonicalUrl,
      headline,
      summary,
      image {
        url,
        caption,
      },
      authors {
        seoName,
        byline,
      }
    }
  }
`;

const Feed = props => {
  const { sectionName } = props;
  const count = 10;
  const { data, fetchMore, loading } = useQuery(GET_ARTICLES, {
    variables: {
      count,
      page: 0,
      sectionName,
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'ignore',
  });
  const { articles = [] } = data || {};
  const loadMore = () => {
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
