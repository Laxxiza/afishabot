const utils = require('../utils.js');

exports.run = async ({ bot, msg, args, chatServiceName, fireadapter }) => {
	const chatId = msg.chat.id;
	const operArr = await fireadapter.getQueue(chatServiceName);
	const countOper = utils.getLength(operArr);

	const userId = msg.from.id;
	const userName = msg.from.username;

	const firstName = msg.from.first_name != null ? msg.from.first_name : '';
	const lastName = msg.from.last_name != null ? msg.from.last_name : '';
	const operName = `${firstName} ${lastName}`;

	var skipOper = args[0];

	if (countOper !== 0) {
		if (utils.getRepeatOper(operArr, userId)) {
			if (skipOper != null && skipOper.length > 5 && skipOper[0] == "@") {
				const sliceOper = args[0].slice(1);
				const newArr = utils.sortArray(operArr);
				const currOper = newArr.filter(item => item['userName'] == userName)[0];
				const switchOper = newArr.filter(item => item['userName'] == sliceOper)[0];
				const changeLunch = currOper['lunch'] || switchOper['lunch'] ? true : false;

				if (switchOper != null && switchOper.length != 0 && userId != switchOper['id']) {
					const lastOperIndex = currOper['index'];
					const firstOperIndex = switchOper['index'];

					if (changeLunch) {
						const firstOperLunch = switchOper['lunch'];
						const lastOperLunch = currOper['lunch'];
						currOper['lunch'] = firstOperLunch;
						switchOper['lunch'] = lastOperLunch;
						console.log("Lunch changed");
					}

					const switchOperUserName = switchOper['userName'];
					const switchOperName = switchOper['operName'];

					var temp = {};
					currOper['index'] = firstOperIndex;
					switchOper['index'] = lastOperIndex;
					//console.log({currOper, switchOper});
					fireadapter.updateQueue({ currOper, switchOper, chatServiceName});
					bot.sendMessage(chatId, `${operName}(@${userName}) поменялся местами с ${switchOperName}(@${switchOperUserName}).`);
				}
				else {
					bot.sendMessage(chatId, `${operName}(@${userName}) такого оператора нет в очереди.`);
				}
			}
		}
		else {
			bot.sendMessage(chatId, `${operName}(@${userName}) тебя нет в очереди.`);
		}
	}
	else {
		bot.sendMessage(chatId, `В очереди сейчас никого нет.`);
	}
}