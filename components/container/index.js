import React from 'react';
import classnames from 'classnames';
import css from './styles.module.css';

const Container = props => {
  const { children, options: { className, direction = 'column', size = 100 } } = props;
  const classes = classnames(className, css.container, css[direction], css[`w-${size}`]);
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Container;
