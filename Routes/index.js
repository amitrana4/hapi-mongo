'use strict';
/**
 * Created by Amit on 13 may 2018.
 */
var AdminRoute = require('./AdminRoute');
var UserRoute = require('./UserRoute');

var all = [].concat(AdminRoute, UserRoute);

module.exports = all;

