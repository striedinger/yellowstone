import React from 'react';
import { ApolloProvider } from '@apollo/client';
import DefaultLayout from '../../layouts/default';
import ArticleCard from '../../components/article-card';
import Tester from '../../components/tester';

const App = ({ client }) => {
  return (
    <ApolloProvider client={client}>
      <DefaultLayout>
        <ArticleCard />
        <Tester />
      </DefaultLayout>
    </ApolloProvider>
  );
};

export default App;
