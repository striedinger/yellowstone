import React from 'react';
import classnames from 'classnames';
import css from './styles.module.css';
import generateSpacingClasses from '../../lib/utils/css/generateSpacingClasses';

const Container = props => {
  const { children, options: { border, className, direction = 'column', margin = [], padding = [], width = 100 } } = props;
  const classes = classnames(css.container, css[direction], css[`width-${width}`], generateSpacingClasses({ border, margin, padding }), className);
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Container;
