var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var userSchema = new Schema({
    //**************************Required Fields**********************************//
    userName: {type: String, trim: true, required: true},
    phoneNumber: {type: String, unique: true, trim: true, required: true},
    //**************************common**********************************//
    accessToken: {type: String, trim: true, index: true, unique: true, sparse: true},
    deviceType: {type: String, trim: true, required: true},
    deviceToken: {type: String, trim: true, required: true},
    onceLogin: {type: String, trim: true, required: true, default:false},
    deleteByAdmin: {type: Boolean, required: true, default: false},
    //**************************Must for all Schemas**********************************//
    createdOn: {type: Date, required: true},
    updatedOn: {default: Date.now, type: Number, required: true}
});


module.exports = mongoose.model('userSchema', userSchema);