import React from 'react';
import Bucket from '../components/bucket';
import Feed from '../components/feed';

const Home = () => {
  return (
    <React.Fragment>
      <Bucket collectionId="FP_US_FEATURE_A_1" />
      <Feed />
    </React.Fragment>
  );
};

export default Home;
