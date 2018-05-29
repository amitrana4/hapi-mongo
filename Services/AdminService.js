'use strict';

var Models = require('../Models');

//Get Users from DB
var getAdmin = function (criteria, projection, options, callback) {
    Models.Admins.find(criteria, projection, options, callback);
};

//Insert User in DB
var createAdmin = function (objToSave, callback) {
    new Models.Admins(objToSave).save(callback)
};
//Update User in DB
var updateAdmin = function (criteria, dataToSet, options, callback) {
    console.log(criteria, dataToSet, options, '==============')
    Models.Admins.findOneAndUpdate(criteria, dataToSet, options, callback);
};



//db.admins.aggregate({$match: {name: {$not: {$type: 1}}, email:  {$not: {$type: 1}}}}, {$group: {_id: "$email", registrationDate : {$avg: "registrationDate"}}})


module.exports = {
    getAdmin: getAdmin,
    createAdmin: createAdmin,
    updateAdmin: updateAdmin
};

