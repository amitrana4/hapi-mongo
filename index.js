'use strict';

/**
 * Created by Amit on 13 may 2018.
 */

//External Dependencies
const Hapi = require('hapi');
const Pack = require('./package');
const Config = require('./Config');
var Routes = require('./Routes');
const HapiSwagger = require('hapi-swagger');
var Plugins = require('./Plugins');
const Inert = require('inert');
const Vision = require('vision');
var Bootstrap = require('./Utils/BootStrap');

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: Config.APP_CONSTANTS.SERVER.PORTS.HAPI,
        routes: { cors: true },
        app: {
            name: Config.APP_CONSTANTS.SERVER.APP_NAME
        }
    });

      
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: Pack.version,
            },
        };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);


    //Bootstrap admin data
    Bootstrap.bootstrapAdmin(function (err, message) {
        if (err) {
            console.log('Error while bootstrapping admin : ' + err)
        } else {
            console.log(message);
        }
    });

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
    
    server.route(Routes);
})();
