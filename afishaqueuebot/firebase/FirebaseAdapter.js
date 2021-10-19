const fireclass = require('./Firebase.js');
const utils = require('../utils.js');
var firebase = new fireclass();

exports.testOperator = function () {
  firebase.testOperator();
}

exports.getQueue = async function (chatServiceName) {
  let operArr = await firebase.getQueue(chatServiceName);
  /*
  var trueArr = new Object();
  var obj = await firebase.getQueue();
  for(let item in obj){
    let el = {
      id:obj[item].id,
      index:Array.from(obj[item].index),
      minuts: Array.from(obj[item].minuts),
      operName:obj[item].operName,
      userName: obj[item].userName
    };
    trueArr[item] = el;
    console.log(el);
  }
  console.log(trueArr);
  let trueArr = {
    id:obj,
    index:[],
    minuts:[],
    operName:,
    userName:
  };*/
  //operators = operArr;
  //console.log(operArr);
  return operArr;
}

exports.updateOperQueue = function (operArr, chatServiceId, chatServiceName) {
  const newArr = utils.arrayAlign(chatServiceId, operArr);
  //console.log(newArr)
  firebase.updateQueue(newArr, chatServiceName);
}

exports.updateQueue = function (operArr, chatServiceName) {
  const newArr = utils.convertArray(operArr);
  firebase.updateQueue(newArr, chatServiceName);
}

exports.addOperator = function (chatServiceName, operator) {
  let id = operator['id'];
  let userName = operator['username'];
  let operName = operator['opername'];
  //let indexArr = [];
  //let indexArr.push();
  let operIndex = operator['operindex'];
  let lunch = operator['lunch'];
  let minuts = operator['minuts'];
  firebase.addOperator(chatServiceName, id, userName, operName, operIndex, lunch, minuts);
}

exports.removeOperator = function (operArr, operatorId, chatServiceId, chatServiceName) {
  let id = operatorId;
  delete operArr[operatorId];
  //console.log(operArr);
  this.updateOperQueue(operArr, chatServiceId, chatServiceName);
  firebase.removeOperator(id, chatServiceName);
}

exports.clear = function (chatServiceName) {
  firebase.clear(chatServiceName);
}