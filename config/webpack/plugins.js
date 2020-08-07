require('dotenv').config();
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDev = () => process.env.NODE_ENV !== 'production';

export const shared = [
  new LoadablePlugin(),
  new MiniCssExtractPlugin({
    filename: isDev() ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDev() ? '[id].[name].css' : '[id].[name].[contenthash].css',
  }),
];

const publicEnvVars = Object.keys(process.env)
  .filter(envVar => envVar.startsWith('PUBLIC_'))
  .reduce((object, envVar) => {
    object[envVar] = process.env[envVar];
    return object;
  }, {});

export const client = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify({
      ...publicEnvVars,
    }),
  }),
  new BundleAnalyzerPlugin({ analyzerMode: 'json' }),
  isDev() && new ReactRefreshWebpackPlugin({ overlay: { sockIntegration: 'whm' } }),
].filter(Boolean);

export const server = [];

export default {
  client,
  server,
  shared,
};
