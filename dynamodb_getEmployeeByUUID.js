'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
  const params = {
    TableName: "Employee_Data_v1.0",
    Key: {
      //employee_id: Number(event.pathParameters.employee_id)
      //employee_id: 5
      uuid: event.pathParameters.uuid
    },
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch employee data.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
      //body: result.Item,
    };
    callback(null, response);
  });
};