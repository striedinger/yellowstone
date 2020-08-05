import baseConfig from './client.base';

const isProd = process.env.NODE_ENV === 'production';

const config = {
  ...baseConfig,
  mode: 'production',
  devtool: isProd ? false : 'source-map',
};

config.output.filename = 'bundle.[hash:8].js';

export default config;