import React from 'react';
import css from './styles.module.css';
import facebookIcon from './facebook.svg';
import twitterIcon from './twitter.svg';
import emailIcon from './email.svg';

const SocialFollow = props => {
  const { socials: { facebookHandle, email, twitterHandle } = {} } = props;
  return (
    <ul className={css['social-follow']}>
      {
        facebookHandle && (
          <li className={css.facebook}>
            <a className={css.icon} href={`https://wwww.facebook.com/${facebookHandle}`} rel="nofollow" target="_blank" aria-label={`${facebookHandle} on Facebook`}>
              <img src={facebookIcon} />
            </a>
          </li>
        )
      }
      { twitterHandle && (
        <li className={css.twitter}>
          <a className={css.icon} href={`https://wwww.twitter.com/${twitterHandle}`} rel="nofollow" target="_blank" aria-label={`${twitterHandle} on Twitter`}>
            <img src={twitterIcon} />
          </a>
        </li>
      ) }
      {
        email && (
          <li className={css.email}>
            <a className={css.icon} href={`mailto:${email}`} rel="nofollow" target="_blank" aria-label={email}>
              <img src={emailIcon} />
            </a>
          </li>
        )
      }
    </ul>
  );
};

export default SocialFollow;
