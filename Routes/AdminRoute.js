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
        path: '/api/admin/login',
        config: {
            description: 'Login for Super Admin',
            tags: ['api', 'admin'],
            handler: async (request, reply) => {
                var queryData = {
                    email: request.payload.email,
                    password: request.payload.password,
                    ipAddress: request.info.remoteAddress || null
                };
                return await Controller.AdminController.adminLogin(queryData)
            },
            validate: {
                failAction: Config.APP_CONSTANTS.failActionFunction,
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            },
            plugins: {
                'hapi-swagger': {
                    payloadType : 'form',
                    responseMessages: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    }

];


var authRoutes = [].concat();

module.exports = authRoutes.concat(non_auth_routes);