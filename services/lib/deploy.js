var AWS = require('aws-sdk');
var fs = require('fs');
var config = require('../conf/' + process.argv[2] + '.js');

AWS.config.region = 'us-east-1'
var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
var params = {
  FunctionName: config.functionName, 
  ZipFile: fs.readFileSync('archive.zip')
};
lambda.updateFunctionCode(params, function(err, data) { 
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
