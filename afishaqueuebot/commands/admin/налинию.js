const utils = require('../../utils.js');
const nconfig = require('nconf');

exports.run = async ({ bot, msg, args, chatServiceId, chatServiceName, fireadapter }) => {
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	const doubleAuto = nconfig.get(`doubleParams:${chatServiceName}:doubleAuto`);
	const countOn = nconfig.get(`doubleParams:${chatServiceName}:count:on`);
	const countOff = nconfig.get(`doubleParams:${chatServiceName}:count:off`);

	const chatId = msg.chat.id;
	const chatReply = nconfig.get(`channel_id:services:${chatServiceName}:main_chat`);
	const operArr = await fireadapter.getQueue(chatServiceName);
	const countOper = utils.getLength(operArr);

	const userId = msg.from.id;
	const userName = msg.from.username;

	const firstName = msg.from.first_name != null ? msg.from.first_name : '';
	const lastName = msg.from.last_name != null ? msg.from.last_name : '';
	const operName = `${firstName} ${lastName}`;
	let skipOper = args[0];


	if (countOper >= countOn - 1 && !double && doubleAuto) {
		let commandFolder = require(`../commands/admin/double.js`);
		let msg = null;
		let args = ["mode", "off"];
		commandFolder.run({ bot, msg, args, fireadapter });
		bot.sendMessage(chatId, `Двойная очередь - включена! В очереди ${countOper} человек.`);
	}
	else if (countOper <= countOff - 1 && double && doubleAuto) {
		let commandFolder = require(`../commands/admin/double.js`);
		let msg = null;
		let args = ["mode", "off"];
		commandFolder.run({ bot, msg, args, fireadapter });
		bot.sendMessage(chatId, `Двойная очередь - включена! В очереди ${countOper - 1} человек.`);
	}


	if (countOper !== 0) {
		if (skipOper != null && skipOper.length > 5 && skipOper[0] == "@") {
			const sliceOper = args[0].slice(1);
			const newArr = utils.sortArray(operArr);
			const kickOper = newArr.filter(item => item['userName'] == sliceOper)[0];
			//console.log(kickOper);
			if (kickOper) {
				const kickOperId = kickOper['id'];
				const kickOperUserName = kickOper['userName'];
				const kickOperOperName = kickOper['operName'];

				fireadapter.removeOperator(operArr, kickOperId, chatServiceId, chatServiceName);
				bot.sendMessage(chatId, `Оператор ${kickOperOperName}(@${kickOperUserName}) был удален из очереди по запросу ${operName}(@${userName}).`);

				let nextLunch;
				if (newArr.length > 1 && kickOper['lunch']) {
					if (double) {
						if (newArr.length > 2) {
							nextLunch = newArr[kickOper['index']]['lunch'] ? newArr[kickOper['index'] + 1] : newArr[kickOper['index']];
							bot.sendMessage(chatReply, `${nextLunch['operName']}(@${nextLunch['userName']}) беги отдыхать!`);
						}
					}
					else {
						nextLunch = newArr[kickOper['index']];
						bot.sendMessage(chatReply, `${nextLunch['operName']}(@${nextLunch['userName']}) беги отдыхать!`);
					}
					//console.log(nextLunch);
				}
			}
			else {
				bot.sendMessage(chatId, `Оператор с таким логином в очереди не найден.`);
			}
		}
		else {
			bot.sendMessage(chatId, `${operName}(@${userName}), необходимо указать логин пользователя с использованием знака "@" в начале.`);
		}
	}
	else {
		bot.sendMessage(chatId, `В очереди сейчас никого нет.`);
	}

}