import React from 'react';
import { gql, useQuery } from '@apollo/client';
import css from './styles.module.css';

const GET_AUTHOR = gql`
  query Author($id: String) {
    author(seoName: $id) {
      byline,
      title,
      hedcutUrl,
      bio,
      twitterHandle,
      email,
    }
  }
`;

const AuthorBio = props => {
  const { id } = props;
  if (!id) return null;
  const { data } = useQuery(GET_AUTHOR, {
    variables: {
      id,
    },
    errorPolicy: 'ignore',
  });
  const { author } = data || {};
  const { byline, title, hedcutUrl, bio, twitterHandle, email } = author || {};
  return (
    <div className={css.author}>
      { hedcutUrl && (
        <div className={css['hedcut-container']}>
          <img className={css.hedcut} src={hedcutUrl} />
        </div>
      ) }
      <h1 className={css.byline}>{byline}</h1>
      <h2 className={css.title}>{title}</h2>
      <div className={css.bio} dangerouslySetInnerHTML={{ __html: bio }} />
    </div>
  );
};

export default AuthorBio;