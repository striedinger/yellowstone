import React from 'react';
import { gql, useQuery } from '@apollo/client';
import ArticleCard from '../article-card';
import Strapline from '../strapline';
import css from './styles.module.css';

const GET_COLLECTION = gql`
  query Collection($collectionId: String!) {
    collection(collectionId: $collectionId) {
      id,
      parameters {
        name, value
      },
      articles {
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
  }
`;

const Bucket = props => {
  const { collectionId } = props;
  const { data } = useQuery(GET_COLLECTION, {
    variables: {
      collectionId,
    },
    errorPolicy: 'ignore',
  });
  const { collection: { articles = [], parameters = [] } = {} } = data || {};
  const { value: collectionTitle } = parameters.find(param => param.name === 'TITLE') || {};
  const { value: collectionLink } = parameters.find(param => param.name === 'LINK') || {};
  return (
    <div className={css.bucket}>
      { collectionTitle &&  <Strapline title={collectionTitle} link={collectionLink} useIcon />}
      {articles.map((article, index) => {
        return <ArticleCard key={index} article={article} />
      })}
    </div>
  );
};

export default Bucket;
