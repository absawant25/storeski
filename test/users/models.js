'use strict';

var utils = require('../utils');
var should = require('should');

var User = require('../../users/models').User;

describe('Users: models', function () {
	describe('#create()', function () {
		it('should create a new user', function (done) {

			var u = {
				name: {
					givenName : 'Abhishek',
					familyName : 'Sawant'
				},
				emails: [
					{
						type: 'home',
						value: 'home@example.com'
					},
					{
						type: 'work',
						value: 'work@example.com'
					}
				],
				contacts: [
					{
						type: 'mobile',
						value: 9623970166
					}
				]

			};
			User.create(u, function(err, createdUser) {

				should.not.exist(err);

				createdUser.name.givenName.should.equal("Abhishek");
				createdUser.name.familyName.should.equal("Sawant");

				createdUser.emails[0].type.should.equal('home');
				createdUser.emails[0].value.should.equal('home@example.com');

				createdUser.emails[1].type.should.equal('work');
				createdUser.emails[1].value.should.equal('work@example.com');

				createdUser.contacts[0].type.should.equal('mobile');
				createdUser.contacts[0].value.should.equal(9623970166);

				done();
			});
		});
	});

	describe("#hashPassword()", function() {
		it('should return a hashed password asynchronously', function(done) {
			var password = "secret";
			User.hashPassword(password, function(err, passwordHash) {

				should.not.exist(err);

				should.exist(passwordHash);

				done();

			});
		});
	});/*** hashPassword test ends **/

	describe("#comparePasswordAndHash()", function () {

		it("should return true if password is valid", function(done) {

			var password = 'secret';

			User.hashPassword(password, function (err, passwordHash) {

				User.comparePasswordAndHash(password, passwordHash, function (err, areEqual) {

					should.not.exist(err);

					areEqual.should.equal(true);

					done();
				});
			});
		});

		it("should return false if password is invalid", function(done) {

			var password = 'secret';

			User.hashPassword(password, function (err, passwordHash) {

				var fakePassword = 'iamhacker';
				User.comparePasswordAndHash(fakePassword, passwordHash, function (err, areEqual) {

					should.not.exist(err);

					areEqual.should.equal(false);

					done();
				});
			});
		});
	});/*** comparePaswordAndHash test ends ***/

});