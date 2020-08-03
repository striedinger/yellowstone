import path from 'path';
import nodeExternals from 'webpack-node-externals';
import paths from '../paths';
import { server as serverLoaders, server } from './loaders';
import plugins from './plugins';

export default {
  name: 'server',
  target: 'node',
  entry: {
    server: path.resolve(paths.srcServer, 'index.js'),
  },
  externals: [
    nodeExternals({ allowlist: /\.css$/ }),
  ],
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath,
  },
  module: {
    rules: serverLoaders,
  },
  plugins: [...plugins.shared, ...plugins.server],
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
  node: {
    __dirname: false,
  },
};
