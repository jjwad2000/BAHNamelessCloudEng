'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamo = new AWS.DynamoDB.DocumentClient();



exports.handler = (event, context, callback) => {
    var expressionAttributeValues = {};
    //expressionAttributeValues[':management_level_val'] = event["queryStringParameters"]["management"];
    //expressionAttributeValues[':management_level_val'] = "Consultant";
    expressionAttributeValues[':management_level_val'] = event["queryStringParameters"]["management"];
    
	var params = {
		TableName : "Employee_Data_v1.0",
		FilterExpression : "#management_level = :management_level_val",
		ExpressionAttributeNames: {
		    "#management_level": "Management Level",
		},
		//ExpressionAttributeValues : {":management_level_val" : event.queryStringParamaters.management}
		//ExpressionAttributeValues : {":management_level_val" : "Principal"}
		ExpressionAttributeValues: expressionAttributeValues,
	};
	
	
    dynamo.scan(params, function(error, data) {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch employee data.',
      });
        } else {
            console.log(data);
            var response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Origin': `https://my-domain.com`,
                },
                body: JSON.stringify(data.Items),
                //body: JSON.stringify(data.items),
                isBase64Encoded: false
            };
            callback(null, response);
        }
    });
};