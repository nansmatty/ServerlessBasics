const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const addTodo = async (event) => {
	const dynamoDB = new AWS.DynamoDB.DocumentClient();

	const { todo } = JSON.parse(event.body);
	const createdAt = new Date();
	const id = uuidv4();

	console.log('This is an ID', id);

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
	handler: addTodo,
};
