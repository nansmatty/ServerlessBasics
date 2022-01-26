const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const updateTodo = async (event) => {
	const dynamoDB = new AWS.DynamoDB.DocumentClient();

	const { completed } = event.body;
	const { id } = event.pathParameters;

	await dynamoDB
		.update({
			TableName: 'TodoTable',
			Key: { id },
			UpdateExpression: 'set completed = :completed',
			ExpressionAttributeValues: {
				':completed': completed,
			},
			ReturnValues: 'ALL_NEW',
		})
		.promise();

	return {
		statusCode: 200,
		body: JSON.stringify({
			msg: 'Todo Updated',
		}),
	};
};

module.exports = {
	handler: middy(updateTodo).use(httpJsonBodyParser()),
};
