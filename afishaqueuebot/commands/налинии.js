const utils = require('../utils.js');
const nconfig = require('nconf');

exports.run = async ({ bot, msg, args, chatServiceId, chatServiceName, fireadapter }) => {
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	const doubleAuto = nconfig.get(`doubleParams:${chatServiceName}:doubleAuto`);
	const countOff = nconfig.get(`doubleParams:${chatServiceName}:count:off`);

	const chatId = msg.chat.id;
	let operArr = await fireadapter.getQueue(chatServiceName);
	const countOper = utils.getLength(operArr);

	const userId = msg.from.id;
	const userName = msg.from.username;
	const firstName = msg.from.first_name != null ? msg.from.first_name : '';
	const lastName = msg.from.last_name != null ? msg.from.last_name : '';
	const operName = `${firstName} ${lastName}`;

	if (countOper <= countOff - 1 && double && doubleAuto) {
		let commandFolder = require(`../commands/admin/double.js`);
		let msg = null;
		let args = ["mode", "off"];
		commandFolder.run({ bot, msg, args, fireadapter });
		bot.sendMessage(chatId, `Двойная очередь - выключена! В очереди ${countOper - 1} человек.`);
	}

	if (countOper != 0) {
		if (utils.getRepeatOper(operArr, userId)) {
			const newArr = utils.sortArray(operArr);
			const trigger = operArr[userId]['index'] - 1 ? 0 : 1;
			//console.log(trigger);
			//неверно линкует если выключен дабл
			if (double && operArr[userId]['lunch']) {
				if (newArr.length > 2) {
					let nextLunch = newArr[operArr[userId]['index']]['lunch'] ? newArr[operArr[userId]['index'] + 1] : newArr[operArr[userId]['index']];
					//console.log(nextLunch);
					let nextOperName = nextLunch['operName'];
					let nextUserName = nextLunch['userName'];
					console.log("go");
					bot.sendMessage(chatId, `${operName}, удачи на линии. \n${nextOperName}(@${nextUserName}) беги отдыхать!`);
				}
				else {
					bot.sendMessage(chatId, `${operName}, удачи на линии.`);
				}
			}
			else if (!double && operArr[userId]['lunch'] && (newArr[trigger] && !newArr[trigger]['lunch'])) {
				let nextLunch = newArr[operArr[userId]['index']];
				if (newArr.length > 1) {
					console.log(nextLunch);
					let nextOperName = nextLunch['operName'];
					let nextUserName = nextLunch['userName'];
					console.log("go");
					bot.sendMessage(chatId, `${operName}, удачи на линии. \n${nextOperName}(@${nextUserName}) беги отдыхать!`);
				}
				else {
					bot.sendMessage(chatId, `${operName}, удачи на линии.`);
				}
			}
			else {
				bot.sendMessage(chatId, `${operName}, удачи на линии.`);
			}
			fireadapter.removeOperator(operArr, userId, chatServiceId, chatServiceName);
		}
		else {
			bot.sendMessage(chatId, "Тебя нет в очереди. Напиши #перерыв чтобы встать в очередь.");
		}
	}
	else {
		bot.sendMessage(chatId, "В очереди сейчас никого нет.");
	}
}