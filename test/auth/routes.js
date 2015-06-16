'use strict';

var utils = require('../utils');
var app = require('../../app').app;
var should = require('should');
var request = require('supertest');
var User = require('../../users/models').User;

describe('Passport: routes', function () {
    
    var baseUrl = '/auth/local';
    var emailAddress = 'absawant22@gmail.com';
    var realPassword = 'secret1';
    
    beforeEach(function (done) {
        
        User.hashPassword(realPassword, function (err, passwordHash) {
            
            var u = {
                passwordHash: passwordHash,
                emails:[
                    {
                        value: emailAddress
                    }
                ]
            };
            
            User.create(u, function(err, u) {
                done();
            });
        });
    });
    
    describe('POST /auth/local', function() {
        it('should redirect to "/account" if authentication fails', function(done) {
            var post = {
                email: 'absawant22@gmail.com',
                password: realPassword
            };

            request(app)
            .post(baseUrl)
            .send(post)
            .expect(302)
            .end(function (err, res){
                should.not.exist(err);

                res.header.location.should.include('/account');

                done();
            });
        });
        
        it('should redirect to "/login" if authentication fails', function(done) {
            
            var post = {
                email: 'absawant22@gmail.com',
                password: 'fakepassword'
            };
            
            request(app)
            .post(baseUrl)
            .send(post)
            .expect(302)
            .end(function (err, res) {
                should.not.exist(err);
                
                res.header.location.should.include('/login');
                
                done();
            });
        });
    });
    
});

