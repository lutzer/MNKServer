'use strict';

var assert = require('assert');
var fs = require('fs');
var _ = require('underscore');
var async = require('async')

var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl;
var TAGS = ['test','hybrid','letterbox'];

describe('API Routes /tags/', function(){

  	before(function(done) {

  		r_require('database/database').connect((err) => {
			
			async.series([
				(callback) => { 
					new Interview({
						text: '1',
						name: 'Test Peter'
					}).save(callback) 
				},
				(callback) => { 
					new Interview({
						text: '2',
						name: 'Test Peter'
					}).save(callback) 
				},
				(callback) => { 
					new Interview({
						text: '3',
						name: 'Test Peter'
					}).save(callback) 
				}
			],() => {
	        	done();
	        });
			
  		});
  	});

  	after(function(done) {
  		async.parallel([
			(callback) => { Interview.removeAll(callback) }
		],() => {
        	r_require('database/database').disconnect();
        	done();
        }); 
    });

	it('should GET 3 tags on api/tags', function(done){

		var request = require('supertest');

		var data = {
			text: "unittest_" + require('node-uuid').v4()
		}

		request(BASE_URL).get('api/tags').end(function(err, res) {
			if (err)
    			throw err;
			
    		var tags = res.body;

    		assert.equal(tags.length,tags.length);

    		assert.equal(tags[0].name,TAGS[0]);
    		assert.equal(tags[1].name,TAGS[1]);
    		assert.equal(tags[2].name,TAGS[2]);

			done();
        });
	})

	it('should GET two models on api/interviews/?tag='+TAGS[1], function(done){

		var request = require('supertest');

		var data = {
			text: "unittest_" + require('node-uuid').v4()
		}

		request(BASE_URL).get('api/interviews/?tag='+TAGS[1]).end(function(err, res) {
			if (err)
    			throw err;

			assert.equal(res.body.docs.length,2);
			done()
        });
	})

	
});

