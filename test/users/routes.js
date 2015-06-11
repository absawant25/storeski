'use strict';

var utils = require('../utils');
var request = require('supertest');
var should = require('should');
var app = require('../../app').app;
var User = require('../../users/models').User;

describe('Users: routes', function () {
	describe('POST /signup', function () {
		it('should redirect to "/account" if the form is valid', function (done) {
			var postData = {
				givenName : "Abhishek",
				familyName : "Sawant",
				email : 'absawant@in.com',
				password : 'secret'
			};

			request(app)
				.post('/signup')
				.send(postData)
				.expect(302)
				.end(function (err, res) {

					should.not.exist(err);

					res.headers.location.should.match('/account');

					done();
				});
			
		});

		it('should redirect to "/login" if the form is invalid', function (done) {

			var postData = {
				givenName : 'Abhishek',
				familyName : '',
				email: 'fakeemail',
				password: 'se'
			};

			request(app)
				.post('/signup')
				.send(postData)
				.expect(302)
				.end(function (err, res) {

					should.not.exist(err);
					res.headers.location.should.match('/signup');
					done();
				});

		});

		it('should create a new user if form is valid', function (done) {
			var postData = {
				givenName : "Abhishek",
				familyName : "Sawant",
				email : 'absawant@in.com',
				password : 'secret'
			};

			request(app)
				.post('/signup')
				.send(postData)
				.expect(302)
				.end(function (err, res) {

					should.not.exist(err);

					User.find(function (err, users) {

						users.length.should.equal(1);

						var u = users[0];
						u.name.givenName.should.equal(postData.givenName);
						u.name.familyName.should.equal(postData.familyName);
						u.emails[0].value.should.equal(postData.email);

						should.exist(u.passwordHash);
						done();

					});

				});
			
		});
		
	});
});