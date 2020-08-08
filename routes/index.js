import loadable from '@loadable/component';
const Home = loadable(() => import('./home'));
const Author = loadable(() => import('./author'));
const Test = loadable(() => import('./test'));

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/author/:id',
    component: Author,
    exact: true,
  },
  {
    path: '/test',
    component: Test,
    exact: true,
  },
];
