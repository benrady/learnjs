// Karma configuration
// Generated on Fri Nov 17 2017 11:14:55 GMT+0900 (JST)

module.exports = function(config) {

  var reportDir = process.env['CIRCLE_TEST_REPORTS'] || '.';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'public',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      
      "app.js",
      "vendor.js",

      "tests/lib/jquery-2.1.4.js",

      "tests/app_spec.js",
      "tests/SpecHelper.js",

      {pattern: "*.html", watched: false, included: false, served: true} 
    ],


    // list of files to exclude
    exclude: [
      // "tests/*.html",
      // "*.html"
    ],

    proxies: {
      '/index.html': '/base/index.html'
  },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/app_spec.js': ['coverage']
    },

    coverageReporter: {
      dir: reportDir + '/coverage/',
      reporters: [ { type: 'html' } ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
