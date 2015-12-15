var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'us-east-1'
var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
var params = {
  FunctionName: 'learnjs_popularAnswers',
  ZipFile: fs.readFileSync('archive.zip')
};
lambda.updateFunctionCode(params, function(err, data) { 
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
