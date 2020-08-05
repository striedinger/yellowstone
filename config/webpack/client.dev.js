import webpack from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import baseConfig from './client.base';

const isProd = process.env.NODE_ENV === 'production';

const config = {
  ...baseConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...baseConfig.plugins,
  ],
  mode: 'development',
  devtool: isProd ? false : 'cheap-module-inline-source-map',
  performance: {
    hints: false,
  },
};

export default config;
