var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: ['jasmine'], //use the jasmine test framework
    files: [
      'public/tests/app_spec.js' //just load this file
    ],
    preprocessors: {
      'public/tests/app_spec.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
    },
    reporters: ['dots'], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        rules: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};