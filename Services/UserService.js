'use strict';

var Models = require('../Models');

//Get Users from DB
var getUser = function (criteria, projection, options, callback) {
    Models.Users.find(criteria, projection, options, callback);
};

//Insert User in DB
var createUser = function (objToSave, callback) {
    new Models.Users(objToSave).save(callback)
};

//Update User in DB
var updateUser = function (criteria, dataToSet, options, callback) {
    Models.Users.findOneAndUpdate(criteria, dataToSet, options, callback);
};

//Delete User in DB
var deleteUser = function (criteria, callback) {
    Models.Users.findOneAndRemove(criteria, callback);
};

module.exports = {
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};

