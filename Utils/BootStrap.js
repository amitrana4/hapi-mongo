'use strict';
/**
 * Created by Amit on 13 may 2018.
 */
var mongoose = require('mongoose');
var Config = require('../Config');
var Service = require('../Services');
var async = require('async');

//Connect to MongoDB
mongoose.connect(Config.dbConfig.mongo.URI, function (err) {
    if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
        console.log('MongoDB Connected');
    }
});

exports.bootstrapAdmin = function (callback) {
    var adminData1 = {
        email: 'admin@admin.com',
        password: '63ee451939ed580ef3c4b6f0109d1fd0',
        name: 'admin'
    };
    var adminData2 = {
        email: 'eng.arana@gmail.com',
        password: '63ee451939ed580ef3c4b6f0109d1fd0',
        name: 'Amit'
    };
    async.parallel([
        function (cb) {
            insertData(adminData1.email, adminData1, cb)
        },
        function (cb) {
            insertData(adminData2.email, adminData2, cb)
        }
    ], function (err, done) {
        callback(err, 'Bootstrapping finished');
    })
};

function insertData(email, adminData, callback) {
    var needToCreate = true;
    async.series([function (cb) {
        var criteria = {
            email: email
        };
        Service.AdminService.getAdmin(criteria, {}, {}, function (err, data) {
            if (data && data.length > 0) {
                needToCreate = false;
            }
            cb()
        })
    }, function (cb) {
        if (needToCreate) {
            Service.AdminService.createAdmin(adminData, function (err, data) {
                cb(err, data)
            })
        } else {
            cb();
        }
    }], function (err, data) {
        console.log('Bootstrapping finished for ' + email);
        callback(err, 'Bootstrapping finished')
    })
}



