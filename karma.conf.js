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
          { 
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query:{
              compact: false
            }
          }
        ]
      },
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: false,
        errorDetails: false,
        warnings: false,
        publicPath: false
      },
      mode: 'development'
    },
    webpackServer: {
      noInfo: true,
      progress: false,
      stats: false,
      debug: false,
      quiet: true //please don't spam the console when running in karma!
    }
  });
};