import Home from './home';
import Test from './test';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/test',
    component: Test,
  },
];
