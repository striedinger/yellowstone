import React from 'react';
import { ApolloProvider } from '@apollo/client';
import DefaultLayout from '../../layouts/default';
import Feed from '../../components/feed';

const App = ({ client }) => {
  return (
    <ApolloProvider client={client}>
      <DefaultLayout>
        <Feed />
      </DefaultLayout>
    </ApolloProvider>
  );
};

export default App;
