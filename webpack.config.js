const path = require('path');
module.exports = {
    // context: __dirname + '/public',
    entry: {
        'app': './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: '[name].js'
    },
    module: {
      loaders: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel-loader", 
          query:{
            presets: ['es2015']
          }
        }
      ]
    }
  };

// const path = require('path');

// module.exports = {
//     entry: './public/app-test.js',
//     output: {
//         path: path.resolve(__dirname, 'bin'),
//         filename: 'app.bundle.js',
//     },
//     module: {
//         loaders: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'e'
//         }]
//     }
// }