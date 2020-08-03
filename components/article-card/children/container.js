import React from 'react';
import ContainerComponent from '../../container';

const Container = props => {
  const { children, className, direction, size } = props;
  const options = {
    className,
    direction,
    size,
  };
  return (
    <ContainerComponent options={options}>
      {children}
    </ContainerComponent>
  );
};

export default Container;
