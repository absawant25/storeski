'use strict';

var User = require('./models').User;

exports.signup = function (req, res) {
	req.onValidationError( function (msg) {

		return res.redirect('/signup');
	});

	req.check('email', 'Please enter a valid email').len(1).isEmail();
	req.check('password', 'Please enter a password with length between 4 and 34 digits').len(4,34);
	req.check('givenName', 'Please enter your first name').len(1);
	req.check('familyName', 'Please enter your last name').len(1);

	var newUser = {
		name: {
			givenName: req.body.givenName,
			familyName: req.body.familyName
		},
		emails:[
			{
				value: req.body.email
			}
		]
	};

	User.hashPassword(req.body.password, function(err, passwordHash) {
		newUser.passwordHash = passwordHash;

		User.create(newUser, function (err, user) {
			res.redirect("/account");
		});
	});
	
}