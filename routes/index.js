import loadable from '@loadable/component';
const Home = loadable(() => import('./home'));
const Test = loadable(() => import('./test'));

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/test',
    component: Test,
    exact: true,
  },
];
