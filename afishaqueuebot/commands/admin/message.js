//const utils = require('../../utils.js');
const nconfig = require('nconf');

exports.run = async ({ bot, msg, args, chatServiceName }) => {
    const chatId = msg.chat.id;
    const chatReply = bot.token == nconfig.get('token2') ? chatId : nconfig.get(`channel_id:services:${chatServiceName}:main_chat`);
    console.log(chatReply);

    let secondCmd;

    if (args.length == 0) {
        bot.sendMessage(chatId, `Необходимо ввести одну из команд.`);
        return;
    }
    else {
        secondCmd = args.shift().toLowerCase().slice(0);
    }

    let evalRes = eval(secondCmd)({ bot, msg, args, chatReply });
}

say = function ({ bot, msg, chatReply }) {
    const chatId = msg.chat.id;
    let replyMess;
    replyMess = msg.text.slice(8 + 5);
    console.log(replyMess);
    if (replyMess.length == 0) {
        bot.sendMessage(chatId, `Необходимо ввести текст для отправки.`);
        return false;
    }

    bot.sendMessage(chatReply, replyMess).then(info => {
        bot.sendMessage(chatId, `Сообщение: ${info.text} \n[id сообщения: ${info.message_id}]`)
        //console.log(info);
    });
    bot.sendMessage(chatId, `Сообщение отправлено в основной чат.`);
}

del = function ({ bot, msg, args, chatReply }) {
    const chatId = msg.chat.id;
    const messegaId = args.shift().toLowerCase().slice(0);
    console.log(messegaId);
    //return false;
    bot.deleteMessage(chatReply, messegaId);
    bot.sendMessage(chatId, `Сообщение удалено.`);
}

edit = function ({ bot, msg, args, chatReply }) {
    const chatId = msg.chat.id;
    const messegaId = args.shift().toLowerCase().slice(0);
    const editedMsg = msg.text.replace(/\s+/g, ' ').slice(8 + 6 + messegaId.length + 1);
    bot.editMessageText(editedMsg, {
        chat_id: chatReply,
        message_id: messegaId
    });
    bot.sendMessage(chatId, `Сообщение изменено.`);
}