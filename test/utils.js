'use strict';

var config = require('../config');
var mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

beforeEach(function (done) {

	function clearDB() {
		for(var i in mongoose.connection.collections) {
			mongoose.connection.collections[i].remove(function () {});
		}

		return done();
	}

	function reconnect() {
		mongoose.connect(config.db.test, function (err) {

			if(err) {
				throw err;
			}

			return clearDB();
		});
	}


	/**if(mongoose.connection.readyState === 0) {
		console.log("Trying to connect...");
		console.log(config.db.test);
		mongoose.connect(config.db.test, function (err) {
			if(err) {
				throw err;
			}

			return clearDB();
		});	
	} else {
		return clearDB();
	}**/

	function checkState() {

		//console.log("mongoose state : " + mongoose.connection.readyState);

		switch (mongoose.connection.readyState) {

			case 0 :
				reconnect();
			break;
			case 1 :
				clearDB();
			break;
			default :
				process.nextTick(checkState);
		}
	}

	checkState();
});



afterEach(function (done) {
	mongoose.disconnect();
	return done();
});