import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ARTICLES = gql`
query { articles { id, headline, sectionName } }
`;

const Tester = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      {data.articles.map((article, index) => {
        return <p key={index}>{article.headline}</p>
      })}
    </div>
  );
};

export default Tester;
