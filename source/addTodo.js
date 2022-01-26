const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const addTodo = async (event) => {
	const dynamoDB = new AWS.DynamoDB.DocumentClient();

	const { todo } = event.body;
	const createdAt = new Date().toISOString();
	const id = uuidv4();

	const newTodo = {
		id,
		todo,
		createdAt,
		completed: false,
	};

	await dynamoDB
		.put({
			TableName: 'TodoTable',
			Item: newTodo,
		})
		.promise();

	return {
		statusCode: 200,
		body: JSON.stringify(newTodo),
	};
};

module.exports = {
	handler: middy(addTodo).use(httpJsonBodyParser()),
};
