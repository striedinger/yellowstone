import React from 'react';
import ContainerComponent from '../../container';

const Container = props => {
  const { border, children, className, direction, margin, padding, width } = props;
  const options = {
    border,
    className,
    direction,
    margin,
    padding,
    width,
  };
  return (
    <ContainerComponent options={options}>
      {children}
    </ContainerComponent>
  );
};

export default Container;
