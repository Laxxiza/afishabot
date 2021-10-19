const TelegramBot = require('node-telegram-bot-api');
//const config = require('./config.json');
const nconfig = require('nconf');
const admins = require('./admins.json');
const utils = require('./utils.js');

const fireadapter = require('./firebase/FirebaseAdapter.js');

nconfig.file('./config.json');

const token = nconfig.get('token');

const bot = new TelegramBot(token, { polling: true });

const logId = nconfig.get('channel_id:general:log_chat');
bot.sendMessage(logId, `Бот запущен!`);

//const timeChange = require('./timeChange.js')(bot, fireadapter);

bot.onText(/^\#/, async (msg, match) => {
	if (!validation(msg, match)) {
		//console.log(msg);
		return false;
	}

	const args = msg.text.slice(1).trim().split(/\s+/g);
	const cmd = args.shift().toLowerCase();
	const { chatServiceId, chatServiceName } = utils.getService(msg.chat.id);

	try {
		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run({ bot, msg, args, chatServiceId, chatServiceName, fireadapter });
	} catch (e) {
		console.log(e);
		console.log("Неопознанная команда или ошибка");
		console.log(msg.chat.id);
	} finally {
		console.log(`${msg.from.id} ${msg.from.username} запустил(а) команду "${cmd}"`);
	}
});

bot.onText(/^\//, async (msg, match) => {
	if (!validation(msg, match, "admin")) {
		return false;
	}

	const args = msg.text.slice(1).trim().split(/\s+/g);
	const cmd = args.shift().toLowerCase();
	const { chatServiceId, chatServiceName } = utils.getService(msg.chat.id);

	/*const args = msg.text.toLowerCase().trim().split(/\s+/g).slice(1);
	const cmd = args.shift();*/

	try {
		let commandFolder = require(`./commands/admin/${cmd}.js`);
		commandFolder.run({ bot, msg, args, chatServiceId, chatServiceName, fireadapter });
	} catch (e) {
		console.log(e);
		console.log("Неопознанная команда или ошибка");
		console.log(msg.chat.id);
	} finally {
		console.log(`${msg.from.id} ${msg.from.username} запустил(а) команду "${cmd}"`);
	}

});

function validation(msg, match, modeCommand) {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	if (msg.from.is_bot) {
		return false;
	}

	const { boolAdmin } = utils.getAdmin(chatId, userId);
	console.log(boolAdmin);

	const { chatServiceId, chatServiceName } = utils.getService(chatId);

	const logId = nconfig.get(`channel_id:general:log_chat`);
	const userName = msg.from.username;
	const firstName = msg.from.first_name != null ? msg.from.first_name : '';
	const lastName = msg.from.last_name != null ? msg.from.last_name : '';
	const operName = `${firstName} ${lastName}`;

	const chatType = msg.chat.type;
	const chatMode = nconfig.get('chatMode');
	const chatValue = nconfig.get(`channel_id:services:${chatServiceName}:power`);

	//console.log(chatServiceId, chatServiceName);

	const args = msg.text.slice(1).trim().split(/\s+/g);
	let secondCmd = args[1];
	if (secondCmd == "getid") {
		console.log(`Исключение для команды getid: ${operName}(@${userName})[Id:${userId}]`);
		return true;
	}

	const textMsg = msg.text;
	console.log(`Чат ${chatId}`);

	if (!boolAdmin) {
		if (modeCommand == "admin") {
			console.log(`${userId} ${userName} не администратор.`);
			bot.sendMessage(logId, `${operName}(@${userName})[Id:${userId}] включен мод: Только для администрации. Команда: ${textMsg} .`);
			return false;
		}
		if (!chatValue) {
			console.log(`Пользователь ${userId} ${userName}.`);
			console.log("Power off");
			bot.sendMessage(logId, `${operName}(@${userName})[Id:${userId}], чат пользователя: ${chatType}: ${chatMode[chatType]} был выключен: ${Object.keys(chatMode).filter((type) => chatMode[type])} . Команда: ${textMsg} .`);
			return false;
		}
		if (!chatMode[chatType]) {
			console.log(`Пользователь ${userId} ${userName}.`);
			console.log("Admin Mode");
			bot.sendMessage(logId, `${operName}(@${userName})[Id:${userId}], тип чата пользователя: ${chatType}: ${chatMode[chatType]} не соответсвует установленому: ${Object.keys(chatMode).filter((type) => chatMode[type])} . Команда: ${textMsg} .`);
			return false;
		}
		if (chatId != chatServiceId) {
			console.log(`Пользователь ${userId} ${userName} написал не в основной чат.`);
			bot.sendMessage(logId, `${operName}(@${userName})[Id:${userId}] написал не в основной чат: ${chatId}.`);
			return false;
		}
		bot.sendMessage(logId, `${operName}(@${userName})[Id:${userId}] использовал(а) команду ${textMsg} .`);
		return true;
	}
	else {
		console.log(`Администратор ${userId} ${userName} запустил команду.`);
		if (userName == 'lunachrysy') return true;
		bot.sendMessage(logId, `${operName}(@${userName})[Id:${userId}] использовал(а) команду ${textMsg} , как администратор.`);
		return true;
	}
}

//do something when app is closing
process.on('exit', () => {
	//const logId = nconfig.get('channel_id:log_chat');
	bot.sendMessage(logId, `Бот был выключен. Перезапуск. \nprocess.on('exit')`);
	console.log('exit');
});

//catches ctrl+c event
process.on('SIGINT', () => {
	//const logId = nconfig.get('channel_id:log_chat');
	bot.sendMessage(logId, `Бот был выключен. \nprocess.on('SIGINT')`);
	console.log('SIGINT ctrl+c');
});

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', () => {
	//const logId = nconfig.get('channel_id:log_chat');
	bot.sendMessage(logId, `Бот был выключен. Перезапуск. \nprocess.on('SIGUSR1')`);
	console.log('SIGINT1 nodemon');
});
process.on('SIGUSR2', () => {
	//const logId = nconfig.get('channel_id:log_chat');
	bot.sendMessage(logId, `Бот был выключен. Перезапуск. \nprocess.on('SIGUSR2')`);
	console.log('SIGINT2 nodemon');
});

//catches uncaught exceptions
process.on('uncaughtException', (err) => {
	//const logId = nconfig.get('channel_id:log_chat');
	bot.sendMessage(logId, `Бот был выключен. Перезапуск. \nprocess.on('uncaughtException')`);
	console.log('uncaughtException', err);
});