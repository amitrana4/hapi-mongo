'use strict';
/**
 * Created by Amit on 13 may 2018.
 */
var Controller = require('../Controllers');
var UniversalFunctions = require('../Utils/UniversalFunctions');

var Joi = require('joi');
const Config = require('../Config');

var non_auth_routes = [
    {
        method: 'POST',
        path: '/user/api/register',
        config: {
            description: 'Register new user',
            tags: ['api', 'user'],
            handler: async (request, reply) => {
                var bodyData = {
                    phone_number: request.payload.phone_number,
                    user_name: request.payload.user_name,
                    deviceType: request.payload.deviceType,
                    deviceToken: request.payload.deviceToken,
                    ipAddress: request.info.remoteAddress || null
                };
                console.log(bodyData)
                let userController = await Controller.UserController.addUser(bodyData)
                console.log(userController)
                // Controller.UserController.addUser(bodyData, function (err, data) {
                //     console.log(err, data, '==========')
                //     if (err) {
                //         reply(Config.APP_CONSTANTS.sendError(err))
                //     } else {
                //         reply(Config.APP_CONSTANTS.sendSuccess(null, data))
                //     }
                // })
            },
            validate: {
                failAction: UniversalFunctions.CONFIG.APP_CONSTANTS.failActionFunction,
                payload: {
                deviceType: Joi.string().required().valid([UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.DEVICE_TYPES.ANDROID, UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.DEVICE_TYPES.IOS]),
                deviceToken: Joi.string().required().min(1).trim(),
                phone_number: Joi.number().required(),
                user_name: Joi.string().required()
                    .description('username which everyone knows'),
                }
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },

];


var authRoutes = [].concat();

module.exports = authRoutes.concat(non_auth_routes);