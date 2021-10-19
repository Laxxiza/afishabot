const utils = require('../../utils.js');
const fs = require('fs');
const nconfig = require('nconf');
const { format } = require('path');

exports.run = async ({ bot, msg, args, chatServiceId, chatServiceName, fireadapter }) => {
	const configPath = "config.json";
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:general:log_chat');

	/*
	const userId = msg.from.id;
	const userName = msg.from.username;

	const firstName = msg.from.first_name != null ? msg.from.first_name : "";
	const lastName = msg.from.last_name != null ? msg.from.last_name : "";
	const operName = `${msg.from.first_name} ${msg.from.last_name}`;
	*/

	let array = await fireadapter.getQueue(chatServiceName);

	let secondCmd;

	if (args.length < 2) {
		bot.sendMessage(chatId, `Необходимо ввести одну из команд.`);
		return;
	}
	else {
		secondCmd = args.shift().toLowerCase().slice(0);
	}
	let fileContent = fs.readFileSync(configPath, 'utf8');
	nconfig.file(configPath);
	//eval(secondCmd)(bot, msg, fileContent, fireadapter, array);
	eval(secondCmd)({ bot, msg, args, fileContent, chatServiceId, chatServiceName, fireadapter, array });
}

mode = async function ({ bot, msg, args, fileContent, chatServiceId, chatServiceName, fireadapter, array }) {
	const command = args.shift().toLowerCase().slice(0);
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:general:log_chat');
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);

	switch (command) {
		case 'on':
			const chatReply = nconfig.get(`channel_id:services:${chatServiceName}:main_chat`);
			if (!double) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleMode`, true);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double mode включен.`)

					for (let item in array) {
						if (array[item]['index'] == 2 && !array[item]['lunch']) {
							const operName = array[item]['operName'];
							const userName = array[item]['userName'];
							//array[item]['lunch'] = true;
							bot.sendMessage(chatReply, `${operName}(@${userName}) беги отдыхать!`);
							break;
						}
					}
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double mode не был включен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double mode включен.`);
			await fireadapter.updateOperQueue(array, chatServiceId, chatServiceName);
			break;

		case 'off':
			if (double) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleMode`, false);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double mode выключен.`);
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double mode не был выключен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double mode выключен.`);
			break;
		case 'status':
			let data = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
			let status = "";
			if (data) status = "включен";
			else status = "выключен";
			bot.sendMessage(chatId, `На данный момент Double mode ${status}.`);
			break;
	}
}

auto = async function ({ bot, msg, args, fileContent, chatServiceName }) {
	const command = args.shift().toLowerCase().slice(0);
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:general:log_chat');
	const auto = nconfig.get(`doubleParams:${chatServiceName}:doubleAuto`);

	switch (command) {
		case 'on':
			if (!auto) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleAuto`, true);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double auto включен.`);
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double auto не был включен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double auto включен.`);

			break;
		case 'off':
			if (auto) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleAuto`, false);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double auto включен.`);
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double auto не был включен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double auto включен.`);
			break;
		case 'status':
			let data = nconfig.get(`doubleParams:${chatServiceName}:doubleAuto`);
			let status = "";
			if (data) status = "включен";
			else status = "выключен";
			bot.sendMessage(chatId, `На данный момент Double auto ${status}.`);
			break;
	}
}

all = async function ({ bot, msg, args, fileContent, chatServiceName, fireadapter, array }) {
	const command = args.shift().toLowerCase().slice(0);
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:general:log_chat');
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	const auto = nconfig.get(`doubleParams:${chatServiceName}:doubleAuto`);

	switch (command) {
		case 'on':
			const chatReply = nconfig.get(`channel_id:services:${chatServiceName}:main_chat`);
			if (!double) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleMode`, true);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double mode включен.`)

					for (let item in array) {
						if (array[item]['index'] == 2 && !array[item]['lunch']) {
							const operName = array[item]['operName'];
							const userName = array[item]['userName'];
							//array[item]['lunch'] = true;
							bot.sendMessage(chatReply, `${operName}(@${userName}) беги отдыхать!`);
							break;
						}
					}
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double mode не был включен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double mode включен.`);
			await fireadapter.updateOperQueue(array, chatServiceId, chatServiceName);

			if (!auto) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleAuto`, true);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double auto включен.`);
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double auto не был включен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double auto включен.`);

			break;

		case 'off':
			if (double) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleMode`, false);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double mode выключен.`);
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double mode не был выключен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double mode выключен.`);

			if (auto) {
				nconfig.set(`doubleParams:${chatServiceName}:doubleAuto`, false);
				try {
					nconfig.save();
					bot.sendMessage(chatId, `Double auto включен.`);
				}
				catch (err) {
					console.log(err);
					bot.sendMessage(chatId, `Double auto не был включен.`)
				}
			}
			else bot.sendMessage(chatId, `На данный момент Double auto включен.`);

			break;
		case 'status':
			let data = nconfig.get(`doubleParams:${chatServiceName}`);
			let statusMode = data.doubleMode ? "включен" : "выключен";
			let statusAuto = data.doubleAuto ? "включен" : "выключен";
			bot.sendMessage(chatId, `На данный момент Double mode ${statusMode}.`);
			bot.sendMessage(chatId, `На данный момент Double auto ${statusAuto}.`);
			break;
	}
}

time = async function ({ bot, msg, args, chatServiceName }) {
	const command = args.shift().toLowerCase().slice(0);
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:general:log_chat');
	const newTime = +args ? +args : null;

	/*if(Number.isNaN(newTime)){
		bot.sendMessage(chatId, `Значение для параметра [${command}] должно быть числом.`);
		return false;
	}*/
	if (newTime == 0 || newTime == null) {
		const param = nconfig.get(`doubleParams:${chatServiceName}:time:${command}`);
		bot.sendMessage(chatId, `Значение [${command}]: ${param}`);
		return false;
	}
	if (newTime > 23 || newTime < 0) {
		bot.sendMessage(chatId, `Значение [${command}] должно быть в промежутке от 0-23`);
		return false;
	}

	switch (command) {
		case 'morning':
			nconfig.set(`doubleParams:${chatServiceName}:time:morning`, newTime);
			try {
				nconfig.save();
				bot.sendMessage(chatId, `Значение для параметра [${command}] было изменено на [${newTime}].`);
			}
			catch (err) {
				console.log(err);
				bot.sendMessage(chatId, `Значение для параметра [${command}] не было изменено.`);
			}
			break;
		case 'evening':
			nconfig.set(`doubleParams:${chatServiceName}:time:evening`, newTime);
			try {
				nconfig.save();
				bot.sendMessage(chatId, `Значение для параметра [${command}] было изменено на [${newTime}].`);
			}
			catch (err) {
				console.log(err);
				bot.sendMessage(chatId, `Значение для параметра [${command}] не было изменено.`);
			}
			break;
	}
}

count = async function ({ bot, msg, args, chatServiceName }) {
	const command = args.shift().toLowerCase().slice(0);
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:general:log_chat');
	const newTime = +args ? +args : null;

	if (newTime == 0 || newTime == null) {
		const param = nconfig.get(`doubleParams:${chatServiceName}:count:${command}`);
		bot.sendMessage(chatId, `Значение [${command}]: ${param}`);
		return false;
	}

	if (newTime < 0) {
		bot.sendMessage(chatId, `Значение [${command}] должно быть больше 0`);
		return false;
	}

	switch (command) {
		case 'on':
			nconfig.set(`doubleParams:${chatServiceName}:count:on`, newTime);
			try {
				nconfig.save();
				bot.sendMessage(chatId, `Значение для параметра [${command}] было изменено на [${newTime}].`);
			}
			catch (err) {
				console.log(err);
				bot.sendMessage(chatId, `Значение для параметра [${command}] не было изменено.`);
			}
			break;
		case 'off':
			nconfig.set(`doubleParams:${chatServiceName}:count:off`, newTime);
			try {
				nconfig.save();
				bot.sendMessage(chatId, `Значение для параметра [${command}] было изменено на [${newTime}].`);
			}
			catch (err) {
				console.log(err);
				bot.sendMessage(chatId, `Значение для параметра [${command}] не было изменено.`);
			}
			break;
	}
}


/*
on = async function (bot, msg, fileContent, fireadapter, array) {
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:log_chat');
	const chatReply = nconfig.get('channel_id:main_chat');
	const double = nconfig.get('doubleParams:doubleMode')
	if (!double) {
		nconfig.set('doubleParams:doubleMode', true);
		if (msg) {
			nconfig.set('doubleParams:doubleAuto', true);
		}
		try {
			nconfig.save();
			//fireadapter.setMode(true);
			bot.sendMessage(chatId, `Double mode включен.`)

			for (let item in array) {
				if (array[item]['index'] == 2 && !array[item]['lunch']) {
					const operName = array[item]['operName'];
					const userName = array[item]['userName'];
					//array[item]['lunch'] = true;
					bot.sendMessage(chatReply, `${operName}(@${userName}) беги отдыхать!`);
					break;
				}
			}
		}
		catch (err) {
			console.log(err);
			bot.sendMessage(chatId, `Double mode не был включен.`)
		}
	}
	else bot.sendMessage(chatId, `На данный момент Double mode включен.`);
	await fireadapter.updateOperQueue(array);
}

off = async function (bot, msg) {
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:log_chat');
	const double = nconfig.get('doubleParams:doubleMode')
	if (double) {
		nconfig.set('doubleParams:doubleMode', false);
		if (msg) {
			nconfig.set('doubleParams:doubleAuto', false);
		}
		try {
			nconfig.save();
			//fireadapter.setMode(false);
			bot.sendMessage(chatId, `Double mode выключен.`);
		}
		catch (err) {
			console.log(err);
			bot.sendMessage(chatId, `Double mode не был выключен.`)
		}
	}
	else bot.sendMessage(chatId, `На данный момент Double mode выключен.`);
}

status = function (bot, msg, fileContent) {
	const chatId = msg ? msg.chat.id : nconfig.get('channel_id:log_chat');
	var data = JSON.parse(fileContent);
	var status = "";
	if (data.doubleMode) status = "включен";
	else status = "выключен";
	bot.sendMessage(chatId, `На данный момент Double mode ${status}.`);
}
*/