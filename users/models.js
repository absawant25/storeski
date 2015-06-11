'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
	contacts : [contactSchema],
	passwordHash: String
});

userSchema.statics.hashPassword = function (passwordRaw, fn) {

	bcrypt.genSalt(10, function(err, salt) {

		bcrypt.hash(passwordRaw, salt, fn);
	});

}

userSchema.statics.comparePasswordAndHash = function (password, passwordHash, fn) {

	bcrypt.compare(password, passwordHash, fn);
}

try {

	exports.User = mongoose.model('User', userSchema);
} catch (e) {

	exports.User = mongoose.model('User');
}