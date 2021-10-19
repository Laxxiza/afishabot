const fs = require('fs');
const admins = require('../../admins.json');
const utils = require('../../utils.js');
const nconfig = require('nconf');

exports.run = function ({ bot, msg, args, chatServiceName, fireadapter }) {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	var secondCmd;

	if (args.length == 0) {
		bot.sendMessage(chatId, `Необходимо ввести одну из команд.`);
		return;
	}
	else {
		secondCmd = args.shift().toLowerCase().slice(0);
	}
	//console.log(msg);
	var evalRes = eval(secondCmd)({ bot, msg, chatServiceName, fireadapter });
}

getid = function ({ bot, msg }) {
	const chatType = msg.chat.type;
	const chatId = msg.chat.id;
	const userId = msg.from.id;
	const userName = msg.from.username;
	const operName = `${msg.from.first_name ? msg.from.first_name : ""} ${msg.from.last_name ? msg.from.last_name : ""}`;
	bot.sendMessage(chatId, `Chat id: ${chatId} \nUser id: ${userId} \nName: ${operName} \nUsername: @${userName} \nType: ${chatType}`);
}

perm = function ({ bot, msg }) {
	const chatId = msg.chat.id;
	const userId = msg.from.id;
	const userName = msg.from.username;
	const operName = `${msg.from.first_name ? msg.from.first_name : ""} ${msg.from.last_name ? msg.from.last_name : ""}`;
	bot.sendMessage(chatId, `${operName} администратор!`);
}

alist = function ({ bot, msg }) {
	const chatId = msg.chat.id;
	const userId = msg.from.id;
	const {adminsArr} = utils.getAdmin(chatId, userId);
	const userName = msg.from.username;
	const operName = `${msg.from.first_name ? msg.from.first_name : ""} ${msg.from.last_name ? msg.from.last_name : ""}`;
	for (let item in adminsArr) {
		let adminId = adminsArr[item]['userid'];
		let adminName = adminsArr[item]['username'];
		let adminOper = adminsArr[item]['opername'];
		bot.sendMessage(chatId, `User id: *${adminId}* \nUser name: *${adminName}* \nName: *${adminOper}*`, { parse_mode: "markdown" });
	}
}

add = async function ({ bot, msg, chatServiceName, fireadapter }) {
	const operArr = await fireadapter.getQueue(chatServiceName);
	const countOper = utils.getLength(operArr);

	const chatId = msg.chat.id;
	const userId = utils.seed(countOper + 1);
	const userName = 'username' + (countOper + 1);
	const operName = `firstName${countOper + 1} lastName${countOper + 1}`;
	const operIndex = countOper + 1;
	const minuts = 15;

	let lunch = false;
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	if (double) {
		if (countOper < 2) {
			lunch = true;
		}
	}
	else if (countOper == 0) {
		lunch = true;
	}

	const args = msg.text.toLowerCase().trim().split(/\s+/g).slice(2);
	const cmd = args.shift();
	switch (cmd) {
		case 'oper':
		case 'operator':
			fireadapter.addOperator(chatServiceName, { 'id': userId, 'username': userName, 'opername': operName, 'operindex': operIndex, 'lunch': lunch, 'minuts': minuts });
			bot.sendMessage(chatId, 'Добавлен новый оператор!');
			break;
	}
}

clear = async function({ bot, msg, chatServiceName, fireadapter }){
	const operArr = await fireadapter.getQueue(chatServiceName);
	const countOper = utils.getLength(operArr);

	const chatId = msg.chat.id;
	const userId = msg.from.id;
	const userName = msg.from.username;
	const operName = `${msg.from.first_name ? msg.from.first_name : ""} ${msg.from.last_name ? msg.from.last_name : ""}`;

	if(!countOper){
		bot.sendMessage(chatId, "В очереди сейчас никого нет!");
		return;
	}
	
	fireadapter.clear(chatServiceName);
	bot.sendMessage(chatId, `${operName}(@${userName}) очистил очередь!`);
}

/*edit = async function ({ bot, msg, fireadapter }) {
	const operArr = await fireadapter.getQueue();
	//const countOper = utils.getLength(operArr);

	const chatId = msg.chat.id;
	const userId = msg.from.id;
	const userName = msg.from.username;
	const operName = `${msg.from.first_name ? msg.from.first_name : ""} ${msg.from.last_name ? msg.from.last_name : ""}`;

	const args = msg.text.toLowerCase().trim().split(/\s+/g).slice(2);
	const cmd = args.shift();

	switch (cmd) {
		case 'minuts':
			const user = args.shift().slice(1);
			const editMinuts = args.shift();

			for (let oper in operArr) {
				console.log(operArr[oper].userName);
				if (operArr[oper].userName == user) {
					console.log(operArr[oper].id);
				}
			}

			//fireadapter.updateOperQueue();
			//bot.sendMessage(chatId, 'Время перерыва у оператора {} было изменено!');
			break;
	}
}*/