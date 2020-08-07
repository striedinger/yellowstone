import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultLayout from '../../layouts/default';
import routes from '../../routes';

const App = () => {
  return (
    <DefaultLayout>
      <Switch>
        { routes.map((route, index) => (
          <Route {...route } key={index} />
        )) }
      </Switch>
    </DefaultLayout>
  );
};

export default App;
