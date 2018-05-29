let Config = require('../Config');
let Service = require('../Services');

let createUserPromise = (dataToSave) => {
    return new Promise((resolve, reject) => {
        try {
        var finalDataToSave = {};
            finalDataToSave.createdOn = new Date().toISOString();
            finalDataToSave.loggedInOn = new Date().toISOString();
            finalDataToSave.userName = dataToSave.user_name;
            finalDataToSave.phoneNumber = dataToSave.phone_number;
            finalDataToSave.deviceType = dataToSave.deviceType;
            finalDataToSave.deviceToken = dataToSave.deviceToken;

            Service.UserService.createUser(finalDataToSave, function (err, userData) {
                if (err) {
                    reject(err)
                } else {
                    resolve(userData);
                }
            })
        }
        catch(error) {
            console.log(error, '==xcvxcv==sdfsdfsdf================================');
            // expected output: SyntaxError: unterminated string literal
            // Note - error messages will vary depending on browser
          }
    });
  }


  module.exports = {
    createUserPromise: createUserPromise
};