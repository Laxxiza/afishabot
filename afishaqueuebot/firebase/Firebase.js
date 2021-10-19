const firebase = require('firebase');

const firebaseConfig = require('./firebase_config.json');

const modeDB = "operators";
const afisha = "afish-operators";
const afisha_sec = "afish-second-line";
const afisha_new = "afish-new-line";
const afisha_new_two = "afish-new-line-two";
const afisha_new_three = "afish-new-line-three";
const travel = "travel-operators";
const travel_second = "travel-second-operators";
const test_modeDB = "test-operators";
const general_kc = "general-kc";
const geo_kc = "geo";
const fuel_kc = "fuel";
const taxib2b_kc = "taxib2b";
const servModel_kc = "servModel";

let ref;
let afs;
let trv;
let trv_sec;
let afs_sec;
let afs_new;
let afs_new_two;
let afs_new_three;
let gen;
let geo;
let fuel;
let taxib2b;
let servModel;

module.exports = class FireBase {

  constructor() {
    firebase.initializeApp(firebaseConfig.config);
    ref = firebase.database().ref(test_modeDB);
    afs = firebase.database().ref(modeDB);
    afs_sec = firebase.database().ref(afisha_sec);
    afs_new = firebase.database().ref(afisha_new);
    afs_new_two = firebase.database().ref(afisha_new_two);
    afs_new_three = firebase.database().ref(afisha_new_three);
    trv = firebase.database().ref(travel);
    trv_sec = firebase.database().ref(travel_second);
    gen = firebase.database().ref(general_kc);
    geo = firebase.database().ref(geo_kc);
    fuel = firebase.database().ref(fuel_kc);
    taxib2b = firebase.database().ref(taxib2b_kc);
    servModel = firebase.database().ref(servModel_kc);
  }

  testOperator() {
    for (let i = 0; i < 3; i++) {
      ref.child(854962 + i).set({
        id: 854962 + i,
        userName: `userName${i + 1}`,
        operName: `operName${i + 1}`,
        index: i + 1,
        minuts: 10
      });
    }
    console.log("TEST Operator added");
  }

  getQueue(chatServiceName) {
    switch (chatServiceName) {
      case 'afisha':
        return afs.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'afisha-second-line':
        return afs_sec.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'afisha-new-line':
        return afs_new.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'afisha-new-line-two':
        return afs_new_two.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'afisha-new-line-three':
        return afs_new_three.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'travel':
        return trv.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'travel-second-line':
        return trv_sec.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'general-kc':
        return gen.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'geo':
        return geo.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'fuel':
        return fuel.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'taxib2b':
        return taxib2b.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
      case 'servModel':
        return servModel.once('value').then(function (snapshot) {
          console.log("Queue returned");
          return snapshot.val();
        });
        break;
    }
    /*
    //let returnArr = {};
    return ref.once('value').then(function (snapshot) {
      snapshot.forEach(item => {
        returnArr[item.val()['id']] = item.val();
      });
      console.log("Queue returned");
      return snapshot.val();
    });
    */
  }

  updateQueue(operArr, chatServiceName) {
    switch (chatServiceName) {
      case 'afisha':
        afs.update(operArr);
        break;
      case 'afisha-second-line':
        afs_sec.update(operArr);
        break;
      case 'afisha-new-line':
        afs_new.update(operArr);
        break;
      case 'afisha-new-line-two':
        afs_new_two.update(operArr);
        break;
      case 'afisha-new-line-three':
        afs_new_three.update(operArr);
        break;
      case 'travel':
        trv.update(operArr);
        break;
      case 'travel-second-line':
        trv_sec.update(operArr);
        break;
      case 'general-kc':
        gen.update(operArr);
        break;
      case 'geo':
        geo.update(operArr);
        break;
      case 'fuel':
        fuel.update(operArr);
        break;
      case 'taxib2b':
        taxib2b.update(operArr);
        break;
      case 'servModel':
        servModel.update(operArr);
        break;
    }
  }

  addOperator(chatServiceName, id, userName, operName, operIndex, lunch, minuts) {
    switch (chatServiceName) {
      case 'afisha':
        afs.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'afisha-second-line':
        afs_sec.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'afisha-new-line':
        afs_new.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'afisha-new-line-two':
        afs_new_two.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'afisha-new-line-three':
        afs_new_three.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'travel':
        trv.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'travel-second-line':
        trv_sec.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'general-kc':
        gen.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'geo':
        geo.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'fuel':
        fuel.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'taxib2b':
        taxib2b.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
      case 'servModel':
        servModel.child(id).set({
          id: id,
          userName: userName,
          operName: operName,
          index: operIndex,
          lunch: lunch,
          minuts: minuts
        });
        break;
    }
    console.log("Operator added");
  }

  removeOperator(id, chatServiceName) {
    switch (chatServiceName) {
      case 'afisha':
        afs.child(id).remove();
        break;
      case 'afisha-second-line':
        afs_sec.child(id).remove();
        break;
      case 'afisha-new-line':
        afs_new.child(id).remove();
        break;
      case 'afisha-new-line-two':
        afs_new_two.child(id).remove();
        break;
      case 'afisha-new-line-three':
        afs_new_three.child(id).remove();
        break;
      case 'travel':
        trv.child(id).remove();
        break;
      case 'travel-second-line':
        trv_sec.child(id).remove();
        break;
      case 'general-kc':
        gen.child(id).remove();
        break;
      case 'geo':
        geo.child(id).remove();
        break;
      case 'fuel':
        fuel.child(id).remove();
        break;
      case 'taxib2b':
        taxib2b.child(id).remove();
        break;
      case 'servModel':
        servModel.child(id).remove();
        break;
    }
  }

  clear(chatServiceName) {
    switch (chatServiceName) {
      case 'afisha':
        break;
      case 'afisha-second-line':
        break;
      case 'afisha-new-line':
        afs_new.remove();
        break;
      case 'afisha-new-line-two':
        break;
      case 'afisha-new-line-three':
        break;
      case 'travel':
        break;
      case 'travel-second-line':
        break;
      case 'general-kc':
        break;
      case 'geo':
        break;
      case 'fuel':
        break;
      case 'taxib2b':
        break;
      case 'servModel':
        break;
    }
  }
}

/*
  module.exports.getQueue = function(){
    ref.once("value").then(function(snapshot) {
      var queue = {};
      /*for(let obj in snapshot.val()){
        queue.push(snapshot.val()[obj]);
      }
      snapshot.forEach(function (child){
        queue[child.val()['id']] = child.val();
      });
      queueOpers = queue;
      testQue();
      //console.log(queue);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    return queueOpers;
  }

  exports.addOperator = function(id, userName, operName){
  ref.child(id).set({
      id: id,
      userName: userName,
      operName: operName
    });
    console.log("Added");
  }

  exports.removeOperator = function(){

  }
}*/