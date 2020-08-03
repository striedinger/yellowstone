import webpack from 'webpack';
import nodemon from 'nodemon';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import rimraf from 'rimraf';
import paths from '../config/paths';
import getConfig from '../config/webpack';
import { compilerPromise } from './utils';

rimraf.sync(paths.clientBuild);
rimraf.sync(paths.serverBuild);

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const app = express();

const WEBPACK_PORT = process.env.WEBPACK_PORT || (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

const start = async () => {
  const [clientConfig, serverConfig] = webpackConfig;

  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

  const publicPath = clientConfig.output.publicPath;

  clientConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  serverConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');
  const serverCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'server');

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: clientConfig.stats,
    watchOptions,
  }));

  app.use(webpackHotMiddleware(clientCompiler));

  app.use('/public', express.static(paths.clientBuild));

  app.listen(WEBPACK_PORT);

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      console.error(error, 'error');
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      console.error(errors[0]);
      console.error(errors[1]);
      console.error(errors[2]);
    }
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    console.error(error);
  }

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ['lib', 'scripts', 'config', './*.*', 'build/client'],
    delay: 200,
  });

  script.on('restart', () => {
    console.info('Server has been restarted');
  });

  script.on('quit', () => {
    console.warning('Process ended');
    process.exit();
  });

  script.on('error', () => {
    console.error('An error occured, exiting');
    process.exit(1);
  });
};

start();
