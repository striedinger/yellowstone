import React from 'react';
import { useParams } from 'react-router-dom';
import css from './styles.module.css';

import AuthorBio from '../../components/author-bio';

const Author = () => {
  const { id } = useParams();

  return (
    <div className={css.container}>
      <div className={css.content}>
        <AuthorBio id={id} />
      </div>
    </div>
  );
};

export default Author;
