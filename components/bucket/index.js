import React from 'react';
import { gql, useQuery } from '@apollo/client';
import ArticleCard from '../article-card';
import Container from '../container';
import Strapline from '../strapline';
import css from './styles.module.css';
import layout from './layouts/one.json';
import Lead from './layouts/lead';

const elements = {
  article: ArticleCard,
  container: Container,
};


const GET_COLLECTION = gql`
  query Collection($collectionId: String!) {
    collection(id: $collectionId) {
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

const renderTree = (json, articles) => {
  const tree = json.map((element, index) => {
    const Element = elements[element.type];
    const article = element.type === 'article' && articles.length > 0 ? articles.shift() : null;
    const { tree: children = null } = element.children && renderTree(element.children, articles) || {};
    const props = {
      options: {
        ...element.options
      },
      article,
      className: css[element.type],
    };
    if (element.type === 'article' && !article) return null;
    return (
      <Element key={index} {...props}>
        {children}
      </Element>
    );
  });
  return {
    tree,
    articles,
  };
};

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
  // const { tree } = renderTree(layout, [...articles]);
  return (
    <div className={css.bucket}>
      { collectionTitle &&  <Strapline title={collectionTitle} link={collectionLink} useIcon />}
      <Lead articles={articles} />
      {/* { tree } */}
    </div>
  );
};

export default Bucket;
