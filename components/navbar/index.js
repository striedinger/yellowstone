import React from 'react';
import logo from './wsj-full.svg';
import css from './styles.module.css';

const Navbar = props => {
  return (
    <header className={css.navbar}>
      <a className={css.logo} href="https://www.wsj.com">
        <img src={logo} alt="The Wall Street Journal"/>
      </a>
    </header>
  );
};

export default Navbar;
