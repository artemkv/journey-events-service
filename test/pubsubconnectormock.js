"use strict";

let lastCallData = {};
let allCallData = {
    counter: 0
};
console.log('initializing connector mock...');

function publishAction(action) {
    return new Promise(function (resolve, reject) {
        lastCallData.action = action;
        allCallData.counter++;

        process.nextTick(resolve);
    });
}

function publishError(error) {
    return new Promise(function (resolve, reject) {
        lastCallData.error = error;
        allCallData.counter++;

        process.nextTick(resolve);
    });
}

exports.allCallData = allCallData;
exports.lastCallData = lastCallData;

exports.publishAction = publishAction;
exports.publishError = publishError;