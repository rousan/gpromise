const path = require('path');

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
  devtool: 'source-map',
  devServer: {
    inline: true,
    contentBase: './example',
  },
};
