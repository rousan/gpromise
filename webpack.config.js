const path = require("path");

const outputDirectory = path.resolve(__dirname, "dist", "umd");
const entryFile = path.resolve(__dirname, "src", "index.ts");
const libraryName = "GPromise";
const outFileInfix = process.env.PROD ? ".min" : "";
const outFileName = `${libraryName.toLowerCase()}${outFileInfix}.js`;

// Webpack does not support universal bundles yet:
// https://github.com/webpack/webpack/issues/6525
const globalThisSnippet = `(function() {
  if (typeof globalThis === 'object') return globalThis;
  try {
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function() {
        return this;
      },
      configurable: true
    });
    if (typeof __magic__ === 'undefined') {
      return window;
    } else {
      return __magic__;
    }
    delete Object.prototype.__magic__;
  } catch (error) {
    return window;
  }
}())`;

module.exports = {
  entry: entryFile,
  output: {
    path: outputDirectory,
    filename: outFileName,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: globalThisSnippet,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./example",
    host: "0.0.0.0",
  },
};
