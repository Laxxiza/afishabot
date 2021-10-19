const utils = require('../utils.js');
const nconfig = require('nconf');

exports.run = async ({ bot, msg, args, chatServiceName, fireadapter }) => {
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	const chatId = msg.chat.id;
	const userId = msg.from.id;
	const operArr = await fireadapter.getQueue(chatServiceName);
	//console.log(operArr);
	const countOper = utils.getLength(operArr);

	const strOper = utils.getOperString(operArr);

	/*if(countOper != 0){
		let totalminuts = utils.totalWaiting(operArr, userId);
		let totalHour = Math.floor(totalminuts/60);
		let totalMin = totalminuts%60;
		let srtminuts = "";
		if(totalHour) srtminuts += `${totalHour}ч:`;
		srtminuts += `${totalMin}м`;
		bot.sendMessage(chatId, `В очереди сейчас ${countOper} операторов. \n${strOper} \nТы пойдешь на перерыв примерно через ${srtminuts} (${totalminuts} минут).`);
	}
	else {
		bot.sendMessage(chatId, "В очереди сейчас никого нет.");
	}*/

	let alertStr = double ? "[По двое]" : '[По одному]';

	if (countOper == 0) {
		alertStr += "\nВ очереди сейчас никого нет.";
		bot.sendMessage(chatId, alertStr);
		return false;
	}

	let totalminuts = utils.totalWaiting(chatId, operArr, userId);

	alertStr += `\nВ очереди сейчас ${countOper} операторов. \n${strOper}`;
	if (totalminuts) {
		let srtminuts = utils.closeTime(totalminuts);

		alertStr += `\nТы сможешь пойти на перерыв примерно через ${srtminuts} (${totalminuts} минут).`;
	}
	else {
		alertStr += `\nТы сможешь пойти на перерыв сейчас.`;
	}

	bot.sendMessage(chatId, alertStr);
}