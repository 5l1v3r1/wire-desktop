const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => ({
  devtool: env.production ? undefined : 'cheap-eval-source-map',
  entry: path.resolve(__dirname, 'electron/renderer/src/index.tsx'),
  externals: {
    'fs-extra': '{}',
  },
  mode: !env.production ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
    path: 'empty',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'electron/renderer/dist'),
  },
  plugins: env.production
    ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"',
          },
        }),
      ]
    : undefined,
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  stats: 'errors-only',
});
