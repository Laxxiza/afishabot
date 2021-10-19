exports.run = function ({ bot, msg, args }) {
	const chatId = msg.chat.id;
	const userId = msg.from.id;
	console.log(`From ${chatId} \nchatId:${chatId} \nPong!`);
	bot.sendMessage(chatId, "Pong!");
}