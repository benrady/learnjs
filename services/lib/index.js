var http = require('http');
var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var config = {
  dynamoTableName: 'learnjs',
  functionName: 'arn:aws:lambda:us-east-1:730171000947:function:learnjs_popularAnswers'
};

exports.dynamodb = new AWS.DynamoDB.DocumentClient();

exports.fetchPopularAnswers = function(json, context) {  
  context.succeed(["Hello from the cloud! You sent " + JSON.stringify(json)]);
};
