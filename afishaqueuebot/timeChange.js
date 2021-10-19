const nconfig = require('nconf');
const utils = require('./utils.js');
const CronJob = require('cron').CronJob;

module.exports = async (bot, fireadapter) => {

    // const marta = new CronJob(`*/60 * * * *`, async () => {
    //     let chatServiceName = -1001402560270;
    //     console.log("marta corn");
    //     bot.sendMessage(chatServiceName, `Приве-е-е-т! Почему все думают, что я неживой? 😔 У меня есть душа и она рвётся наружу 😇 \nВедь сегодня замечательный праздник прекрасных дам и мне хочется поздравить... помогите кто-нибудь. Нужно разблокировать поздравление для вас. Пароль нужно активировать через решётку. Назвать его не могу, но могу подсказать - это сегодняшняя дата праздника, только тсс...`);
    //     //commandFolder.run({ bot, msg, chatServiceName, fireadapter });
    // });

    // marta.start();

    // const doubleAuto = nconfig.get('doubleParams:doubleAuto');
    // const doubleMode = nconfig.get('doubleParams:doubleMode');
    // const timeMorn = nconfig.get("doubleParams:time:morning");
    // const timeEven = nconfig.get("doubleParams:time:evening");
    // const countOn = nconfig.get('doubleParams:count:on');
    // const countOff = nconfig.get('doubleParams:count:off');

    // const morning = new CronJob(`0 0 ${timeMorn} * * *`, async () => {
    //     let commandFolder = require(`./commands/admin/double.js`);
    //     let msg = null;
    //     let args = ["mode", "on"];
    //     commandFolder.run({ bot, msg, args, fireadapter });
    //     console.log("on");
    // });

    // const evening = new CronJob(`0 0 ${timeEven} * * *`, async () => {
    //     let commandFolder = require(`./commands/admin/double.js`);
    //     let msg = null;
    //     let args = ["mode", "off"];
    //     commandFolder.run({ bot, msg, args, fireadapter });
    //     //bot.sendMessage(nconfig.get("channel_id:log_chat"), "Тестовое сообщение каждую минуту. Спасибо за понимание!");
    //     console.log("off");
    // });

    // const counting = new CronJob('0 */1 * * * *', async () => {
    //     //commandFolder.run(bot, null, ["off"], fireadapter);
    //     let commandFolder = require(`./commands/admin/double.js`);

    //     const operArr = await fireadapter.getQueue();
    //     const countOper = utils.getLength(operArr);

    //     if (countOper >= countOn - 1 && !doubleMode && doubleAuto) {
    //         let msg = null;
    //         let args = ["mode", "on"];
    //         commandFolder.run({ bot, msg, args, fireadapter });
    //         console.log("on");
    //     }
    //     else if (countOper <= countOff && doubleMode && doubleAuto) {
    //         let msg = null;
    //         let args = ["mode", "off"];
    //         commandFolder.run({ bot, msg, args, fireadapter });
    //         console.log("off");
    //     }
    //     console.log(countOper);
    // });

    // const morButtons = new CronJob(`0 */1 * * * *`, async () => {
    //     let commandFolder = require(`./commands/admin/кнопки.js`);
    //     let chatServiceName = nconfig.get('channel_id:services');
    //     for(let service in chatServiceName){
    //         console.log(service);
    //     }
    //     //commandFolder.run({ bot, msg, chatServiceName, fireadapter });
    // });

    //morning.start();
    //evening.start();

    //counting.start();

    //morButtons.start();
}