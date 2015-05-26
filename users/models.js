'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var emailSchema = new Schema ({
	type : {type:String},
	value: String
});

var contactSchema = new Schema ({
	type : {type:String},
	value: Number
});

var userSchema = new Schema({
	name : {
		givenName : String,
		familyName : String
	},
	emails: [emailSchema],
	contacts : [contactSchema]
});

try {

	exports.User = mongoose.model('User', userSchema);
} catch (e) {

	exports.User = mongoose.model('User');
}