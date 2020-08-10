import React from 'react';
import Bucket from '../components/bucket';
import Feed from '../components/feed';

const Home = () => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', width: '60%', margin: '10px auto' }}>
        <div style={{ flexBasis: '80%', paddingRight: '10px', borderRight: '1px solid #ccc' }} >
          <Bucket collectionId="FP_US_LEAD_1" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexBasis: '20%', marginLeft: '10px', backgroundColor: 'lightblue' }}>
          Sidebar
        </div>
      </div>
      <Feed />
    </React.Fragment>
  );
};

export default Home;
