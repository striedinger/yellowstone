import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isDev = () => process.env.NODE_ENV !== 'production';

export const shared = [
  new LoadablePlugin(),
  new MiniCssExtractPlugin({
    filename: isDev() ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDev() ? '[id].[name].css' : '[id].[name].[contenthash].css',
  }),
];

export const client = [
  new webpack.DefinePlugin({}),
  isDev() && new ReactRefreshWebpackPlugin({ overlay: { sockIntegration: 'whm' } }),
].filter(Boolean);

export const server = [
  new webpack.DefinePlugin({}),
];

export default {
  client,
  server,
  shared,
};
