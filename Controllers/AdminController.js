'use strict';

var Service = require('../Services');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var TokenManager = require('../Utils/TokenManager');
var async = require('async');


/*var resetPassword = function (email, callback) {
    var generatedPassword = UniversalFunctions.generateRandomString();
    var customerObj = null;
    if (!email) {
        callback(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    } else {
        async.series([
            function (cb) {
                //Get User
                var criteria = {
                    email: email
                };
                var setQuery = {
                    firstTimeLogin: true,
                    password: UniversalFunctions.CryptData(generatedPassword)
                };
                Service.CustomerService.updateCustomer(criteria, setQuery, {new: true}, function (err, userData) {
                    console.log('update customer', err, userData)
                    if (err) {
                        cb(err)
                    } else {
                        if (!userData || userData.length == 0) {
                            cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_FOUND);
                        } else {
                            customerObj = userData;
                            cb()
                        }
                    }
                })
            },
            function (cb) {
                if (customerObj) {
                    var variableDetails = {
                        user_name: customerObj.name,
                        password_to_login: generatedPassword
                    };
                    NotificationManager.sendEmailToUser(variableDetails, customerObj.email, cb)
                } else {
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
                }
            }
        ], function (err, result) {
            callback(err, {generatedPassword: generatedPassword}); //TODO Change in production DO NOT Expose the password
        })
    }
};*/

var adminLogin =  async (userData) => {
    try {
    return new Promise(async (resolve, reject) => {
    var tokenToSend = null;
    var responseToSend = {};
    var tokenData = null;

    console.log(UniversalFunctions.CryptData(userData.password))
    async.series([
        function (cb) {
        var getCriteria = {
            email: userData.email,
            password: UniversalFunctions.CryptData(userData.password)
        };
        Service.AdminService.getAdmin(getCriteria, {}, {}, function (err, data) {
            if (err) {
                cb({errorMessage: 'DB Error: ' + err})
            } else {
                console.log(data)
                if (data && data.length > 0 && data[0].email) {
                    tokenData = {
                        id: data[0]._id,
                        username: data[0].email,
                        type : UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.USER_ROLES.ADMIN
                    };
                    cb()
                } else {
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_USER_PASS)
                }
            }
        });
    }, function (cb) {
        var setCriteria = {
            email: userData.email
        };
        var setQuery = {
            $push: {
                loginAttempts: {
                    validAttempt: (tokenData != null),
                    ipAddress: userData.ipAddress
                }
            }
        };
        Service.AdminService.updateAdmin(setCriteria, setQuery, function (err, data) {
            cb(err,data);
        });
    }, function (cb) {
        if (tokenData && tokenData.id) {
            TokenManager.setToken(tokenData, function (err, output) {
                if (err) {
                    cb(err);
                } else {
                    tokenToSend = output && output.accessToken || null;
                    cb();
                }
            });

        } else {
            cb()
        }

    }], function (err, data) {
        console.log('sending response')
        responseToSend = {access_token: tokenToSend, ipAddress: userData.ipAddress};
        if (err) {
            return resolve(UniversalFunctions.sendError(err))
        } else {
            return resolve(UniversalFunctions.sendSuccess(null, responseToSend))
        }

    });
    })
}
  catch(error) {
    console.log(error, '==xcvxcv======');
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
  }
};

var adminLogout = function (token, callback) {
    TokenManager.expireToken(token, function (err, data) {
        if (!err && data) {
            callback(null, UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT);
        } else {
            callback(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.TOKEN_ALREADY_EXPIRED)
        }
    })
};

/*
var changePassword = function (queryData, userData, callback) {
    var userFound = null;
    if (!queryData.oldPassword || !queryData.newPassword || !userData) {
        callback(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    } else {
        async.series([
            function (cb) {
                var criteria = {
                    _id: userData.id
                };
                var projection = {};
                var options = {
                    lean: true
                };
                Service.CustomerService.getCustomer(criteria, projection, options, function (err, data) {
                    if (err) {
                        cb(err)
                    } else {
                        if (data && data.length > 0 && data[0]._id) {
                            userFound = data[0];
                            cb();
                        } else {
                            cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_FOUND)
                        }
                    }
                })
            },
            function (cb) {
                //Check Old Password
                if (userFound.password != UniversalFunctions.CryptData(queryData.oldPassword)) {
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.INCORRECT_OLD_PASS)
                } else if (userFound.password == UniversalFunctions.CryptData(queryData.newPassword)) {
                    cb(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.SAME_PASSWORD)
                } else {
                    cb();
                }
            },
            function (cb) {
                // Update User Here
                var criteria = {
                    _id: userFound._id
                };
                var setQuery = {
                    $set: {
                        firstTimeLogin: false,
                        password: UniversalFunctions.CryptData(queryData.newPassword)
                    }
                };
                var options = {
                    lean: true
                };
                Service.CustomerService.updateCustomer(criteria, setQuery, options, cb);
            }

        ], function (err, result) {
            callback(err, null);
        })
    }
};
*/


module.exports = {
    adminLogin: adminLogin,
    adminLogout: adminLogout
};