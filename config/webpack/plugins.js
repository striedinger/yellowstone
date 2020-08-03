import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isDev = () => process.env.NODE_ENV !== 'production';

export const shared = [
  new MiniCssExtractPlugin({
    filename: isDev() ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDev() ? '[id].[name].css' : '[id].[name].[contenthash].css',
  }),
];

export const client = [
  new webpack.DefinePlugin({}),
  new ManifestPlugin({ fileName: 'assets-manifest.json' }),
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
