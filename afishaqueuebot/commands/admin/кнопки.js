exports.run = function ({ bot, msg, args, chatServiceName, fireadapter }) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  /*let secondCmd = args.shift().toLowerCase().slice(0);

  if(secondCmd){
    eval(secondCmd)({ bot, msg, args, chatServiceName, fireadapter });
    return false;
  }*/

  const opts = {
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      one_time_keyboard: false,
      keyboard: [
        ['#перерыв 5', '#перерыв 10', '#перерыв 15'], ['#перерыв 20', '#перерыв 25', '#перерыв 30'],
        ['#очередь', '#налинии', '#помощь']
      ]
    })
  };
  bot.sendMessage(chatId, 'Кнопки добавлены!', opts);

}

/*обновить = function({ bot, msg, args, chatServiceName, fireadapter }){
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  bot.sendMessage(chatId, 'Кнопки обновлены!');
}*/