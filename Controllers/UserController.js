'use strict';

var Service = require('../Services');
var async = require('async');
var Models = require('../Models');
var Config = require('../Config');
var Promises = require('../Promises');


var addUser = (payloadData) => {
    try {
        return new Promise(async (resolve, reject) => {
            let userDat = await Promises.UserPromise.createUserPromise(payloadData)
            console.log(userDat, '====sdfsdfsdf===========================')
        })
    }
      catch(error) {
        console.log(error, '==xcvxcv======');
        // expected output: SyntaxError: unterminated string literal
        // Note - error messages will vary depending on browser
      }
};




module.exports = {
    addUser: addUser
};