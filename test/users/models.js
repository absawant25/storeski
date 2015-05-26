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
			})
		});
	});
});