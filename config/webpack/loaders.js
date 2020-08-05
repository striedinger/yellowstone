import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const isProd = process.env.NODE_ENV === 'production';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const cssModulesOptions = {
  localIdentName: '[local]--[hash:base64:5]'
};

const babelLoader = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    cacheCompression: isProd,
    compact: isProd,
  },
};

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    'css-hot-loader',
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: cssModulesOptions
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProd,
      },
    },
  ],
};

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    'css-hot-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProd,
      },
    },
  ],
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: 'css-loader',
      options: {
        onlyLocals: true,
        modules: cssModulesOptions
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !isProd,
      },
    },
  ],
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: 'url-loader',
  options: {
    limit: 2048,
    name: 'assets/[name].[hash:8].[ext]',
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoaderClient = {
  exclude: [/\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]',
      },
    },
  ],
};

const fileLoaderServer = {
  exclude: [/\.(js|tsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        emitFile: false,
      },
    },
  ],
};

export const client = [
  {
    oneOf: [
      babelLoader,
      cssModuleLoaderClient,
      cssLoaderClient,
      urlLoaderClient,
      fileLoaderClient,
    ],
  },
];

export const server = [
  {
    oneOf: [
      babelLoader,
      cssModuleLoaderServer,
      cssLoaderServer,
      urlLoaderServer,
      fileLoaderServer,
    ],
  },
];

export default { client, server };
