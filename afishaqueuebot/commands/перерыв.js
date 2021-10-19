const utils = require('../utils.js');
const nconfig = require('nconf');

exports.run = async ({ bot, msg, args, chatServiceName, fireadapter }) => {

	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	const doubleAuto = nconfig.get(`doubleParams:${chatServiceName}:doubleAuto`);
	const countOn = nconfig.get(`doubleParams:${chatServiceName}:count:on`);

	const chatId = msg.chat.id;
	const operArr = await fireadapter.getQueue(chatServiceName);
	const countOper = utils.getLength(operArr);
	let operIndex = countOper + 1;

	const userId = msg.from.id;
	const userName = msg.from.username;

	const firstName = msg.from.first_name != null ? msg.from.first_name : '';
	const lastName = msg.from.last_name != null ? msg.from.last_name : '';
	const operName = `${firstName} ${lastName}`;
	let lunch = false;
	const minuts = +args[0] ? +args[0] : null;

	let alertStr = double ? "[По двое]" : '[По одному]';

	if (minuts == null) {
		bot.sendMessage(chatId, `${operName}(@${userName}) необходимо указать кол-во минут!`);
		return false;
	}
	else if (minuts > 30) {
		bot.sendMessage(chatId, `${operName}(@${userName}) на перерыв можно выйти не более чем на 30 минут!`);
		return false;
	}

	if (double) {
		if (countOper < 2) {
			lunch = true;
		}
	}

	if (countOper >= countOn - 1 && !double && doubleAuto) {
		let commandFolder = require(`../commands/admin/double.js`);
		let msg = null;
		let args = ["mode", "on"];
		commandFolder.run({ bot, msg, args, fireadapter });
		bot.sendMessage(chatId, `Двойная очередь - включена! В очереди ${countOper} человек.`);
	}

	if (countOper != 0) {
		if (!utils.getRepeatOper(operArr, userId)) {
			fireadapter.addOperator(chatServiceName, { 'id': userId, 'username': userName, 'opername': operName, 'operindex': operIndex, 'lunch': lunch, 'minuts': minuts });

			let totalminuts = utils.totalWaiting(chatId, operArr, userId);
			alertStr += `\n${operName}(@${userName}) добавлен(а) в очередь. На данный момент в очереди ${countOper + 1} оператора.`;
			if (totalminuts == 0 || double && countOper < 2) {
				//bot.sendMessage(chatId, `${operName}(@${userName}) добавлен(а) в очередь. На данный момент в очереди ${countOper + 1} оператора. \nТы пойдешь на перерыв примерно через ${srtminuts} (${totalminuts} минут).`);
				alertStr += `\nТы сможешь пойти на перерыв сейчас.`;
			}
			else if (totalminuts) {
				let srtminuts = utils.closeTime(totalminuts);

				alertStr += `\nТы сможешь пойти на перерыв примерно через ${srtminuts} (${totalminuts} минут).`;
			}
			bot.sendMessage(chatId, alertStr);
			/*else {
				bot.sendMessage(chatId, `${operName}(@${userName}) добавлен(а) в очередь. На данный момент в очереди ${countOper + 1} оператора. \nТы пойдешь на перерыв примерно через ${srtminuts} (${totalminuts} минут).`);
			}*/
		}
		else {
			alertStr += `\n${operName}(@${userName}) уже в очереди. На данный момент в очереди ${countOper} операторов.`;
			bot.sendMessage(chatId, alertStr);
		}
	}
	else {
		fireadapter.addOperator(chatServiceName, { 'id': userId, 'username': userName, 'opername': operName, 'operindex': operIndex, 'lunch': true, 'minuts': minuts });
		alertStr += `\n${operName}(@${userName}) добавлен(а) в очередь. На данный момент в очереди ${countOper + 1} оператора.`;
		alertStr += `\nТы сможешь пойти на перерыв сейчас.`;
		bot.sendMessage(chatId, alertStr);
	}
}