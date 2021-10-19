const utils = require('../utils.js');
const config = require('../config.json');
const admins = require('../admins.json');

exports.run = async ({bot, msg, args, fireadapter}) => {
	const userId = msg.from.id;
	let date = new Date();
	let dateYears = date.getFullYear();
	let dateMonth = date.getMonth()+1;
	let dateDay = date.getDate();
	let dateTimeHours = date.getHours();
	let dateTimeMinutes = date.getMinutes();
	let dateTimeSeconts = date.getSeconds();
	let str = `${dateYears}/${dateMonth}/${dateDay}/ ${dateTimeHours}.${dateTimeMinutes}.${dateTimeSeconts}`;
	console.log(str);
	//date.setHours(+3);
	//fireadapter.testOperator();
	//fireadapter.getQueue();
}