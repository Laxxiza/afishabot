const nconfig = require('nconf');
const admins = require('./admins.json');

/*exports.getService = function (chatId) {
	const admin = admins.admins[chatId].userid;
	let chatServiceId = false;
	let chatServiceName = false;

	if (!admin) {
		for (let service in nconfig.get('channel_id:services')) {
			//console.log(service);
			for (let channel in nconfig.get(`channel_id:services:${service}`)) {
				let chat = nconfig.get(`channel_id:services:${service}:${channel}`);
				if (chatId == chat) {
					//console.log(chat);
					chatServiceId = chat;
					chatServiceName = service;
				}
			}
		}
	}
	else if (admin) {
		chatServiceId = admin;
		chatServiceName = "test";
	}

	return ({ chatServiceId, chatServiceName });
}*/

exports.getService = function (chatId) {
	let chatServiceId = false;
	let chatServiceName = false;

	for (let service in nconfig.get('channel_id:services')) {
		//console.log(service);
		for (let channel in nconfig.get(`channel_id:services:${service}`)) {
			//console.log(channel);
			let chat = nconfig.get(`channel_id:services:${service}:${channel}`);
			if (chatId == chat) {
				//console.log(chat);
				chatServiceId = chat;
				chatServiceName = service;
				continue;
			}
		}
	}

	return ({ chatServiceId, chatServiceName });
}

exports.getAdmin = function (chatId, userId) {
	let chatServiceId = false;
	let chatServiceName = false;
	let boolAdmin = false;
	//let admin = false;

	for (let service in nconfig.get('channel_id:services')) {
		//console.log(service);
		let adminsArr = admins[service];
		let admin = admins[service][chatId] || admins[service][userId];
		//console.log(admin);
		if (admin != null) {
			if(chatId == admin.userid || userId == admin.userid){
				//console.log(true);
				boolAdmin = true;
				return ( {adminsArr, admin, boolAdmin} );
			}
		}
	}

	return ({boolAdmin});
}

exports.sortArray = function (operArr) {
	if (!operArr) {
		return [];
	}
	let oldArr = Object.values(operArr) || {};
	oldArr = oldArr.sort((a, b) => { return a['index'] - b['index']; });
	return oldArr;
}

exports.getLength = function (array) {
	let oldArr = this.sortArray(array);
	let count = 0;
	if (array) {
		oldArr.forEach(el => { count++; })
	}
	return count;
}

exports.getRepeatOper = function (operArr, userId) {
	if (operArr.hasOwnProperty(userId)) {
		return true;
	}
	return false;
}

exports.subIndex = function (operArr) {
	for (let item in operArr) {
		operArr[item]['index'] = operArr[item]['index'] - 1;
	}
	return operArr;
}

exports.getOperString = function (operArr) {
	const sortArr = this.sortArray(operArr);
	var strOper = "";
	for (let item in sortArr) {
		if (sortArr[item]['index'] % 2 == 0) {
			console.log("Четно " + sortArr[item]['index']);
			strOper += " → ";
			if (sortArr[item]['lunch']) {
				strOper += '[На перерыве] ';
			}
			strOper += `${sortArr[item]['operName']}`;
			if (sortArr[item]['minuts']) {
				strOper += `(${sortArr[item]['minuts']})`;
			}
			if (sortArr[item]['index'] !== sortArr.length) {
				strOper += " → ";
			}

		}
		else {
			console.log("НЕЧетно " + sortArr[item]['index']);
			if (sortArr[item]['lunch']) {
				strOper += '[На перерыве] ';
			}
			strOper += `${sortArr[item]['operName']}`;
			if (sortArr[item]['minuts']) {
				strOper += `(${sortArr[item]['minuts']})`;
			}
		}
	}
	return strOper;
}

exports.arrayAlign = function (chatId, operArr) {
	const { chatServiceId, chatServiceName } = this.getService(chatId);
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	//console.log(double);
	let oldArr = this.sortArray(operArr);
	let midlIndex = 1;
	let newArr = {};
	for (let item in oldArr) {
		if (oldArr[item]['index'] != midlIndex) {
			oldArr[item]['index'] = midlIndex;
		}
		if (oldArr[item]['index'] == 1 || (double && oldArr[item]['index'] == 2)) {
			oldArr[item]['lunch'] = true;
		}
		newArr[oldArr[item]['id']] = oldArr[item];
		midlIndex++;
	}
	return newArr;
}

exports.getQueueDate = function () {
	let date = new Date();
	let dateYears = date.getFullYear();
	let dateMonth = date.getMonth() + 1;
	let dateDay = date.getDate();
	let dateTimeHours = date.getHours();
	let dateTimeMinutes = date.getMinutes();
	let dateTimeSeconts = date.getSeconds();

	if (dateTimeHours < 10) dateTimeHours = '0' + dateTimeHours;
	if (dateTimeMinutes < 10) dateTimeMinutes = '0' + dateTimeMinutes;
	if (dateTimeSeconts < 10) dateTimeSeconts = '0' + dateTimeSeconts;

	let returnDate = `${dateYears}/${dateMonth}/${dateDay}/${dateTimeHours}:${dateTimeMinutes}:${dateTimeSeconts}`;
	return returnDate;
}

exports.convertArray = function (operArr) {
	let oldArr = operArr;
	let newArr = {};
	for (let item in oldArr) {
		newArr[oldArr[item]['id']] = oldArr[item];
	}
	//console.log(newArr);
	return newArr;
}

exports.getRandom = function (min, max) {
	let rMin = min;
	let rMax = max + 1;
	let random = Math.floor(Math.random() * (rMax - rMin) + rMin);
	return random;
}

exports.totalWaiting = function (chatId, operArr, userId) {
	const { chatServiceId, chatServiceName } = this.getService(chatId);
	const double = nconfig.get(`doubleParams:${chatServiceName}:doubleMode`);
	let user = userId;
	let oldArr = this.sortArray(operArr);
	let totalminuts = 0;
	if (operArr.hasOwnProperty(userId) && operArr[userId]['lunch']) {
		return totalminuts;
	}
	for (let item in oldArr) {
		if (oldArr[item]['id'] == userId) break;
		let random = this.getRandom(1, 3);
		totalminuts += oldArr[item]['minuts'] + random;
		//console.log('random', random);
	}
	//console.log(totalminuts);
	//console.log(double);
	if (double && oldArr.length > 1) {
		totalminuts = Math.round(totalminuts / 2);
		//console.log(`del, double:${double}`);
	}
	//console.log(totalminuts);
	return totalminuts;
}

exports.getRandom = function (min, max) {
	let rMin = min;
	let rMax = max + 1;
	let random = Math.floor(Math.random() * (rMax - rMin) + rMin);
	return random;
}

exports.seed = function (seed) {
	let x = Math.sin(seed++);
	let res = (x - Math.floor(x)).toString().slice(2);
	return +res;
}

exports.closeTime = function (totalminuts) {
	let totalHour = Math.floor(totalminuts / 60);
	let totalMin = totalminuts % 60;
	let srtminuts = "";
	if (totalHour) srtminuts += `${totalHour}ч:`;
	srtminuts += `${totalMin}м`;
	return srtminuts;
}

/*
exports.getDate = function () {
	const currDate = new Date();

	return currDate;
}

exports.getTimeDate = function () {

}
*/