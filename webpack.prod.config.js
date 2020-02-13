const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = path.resolve(__dirname, 'dist');
const entryFile = path.resolve(__dirname, './src/index.js');
const libraryName = 'GPromise';
const outFileName = `${libraryName.toLowerCase()}.js`;

module.exports = {
  entry: entryFile,
  output: {
    path: outputDirectory,
    filename: outFileName,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
  ],
};
