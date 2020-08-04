import React from 'react';
import classnames from 'classnames';
import css from './styles.module.css';
import generateSpacingClasses from '../../lib/utils/css/generateSpacingClasses';

const Container = props => {
  const { children, options: { className, direction = 'column', margin = [], padding = [], width = 100 } } = props;
  const classes = classnames(className, generateSpacingClasses({ padding, margin }), css.container, css[direction], css[`w-${width}`]);
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Container;
