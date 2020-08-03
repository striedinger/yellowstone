import React from 'react';
import Navbar from '../../components/navbar';
import css from './styles.module.css';

const DefaultLayout = props => {
  const { children } = props;
  return (
    <React.Fragment>
      <Navbar />
      <main className={css.content}>
        {children}
      </main>
    </React.Fragment>
  );
};

export default DefaultLayout;
