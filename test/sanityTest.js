const request = require('supertest');
const app = require('../server');

describe("Sanity tests", function () {
	describe('GET /', function () {
		it('respond with 200', function (done) {
			request(app)
				.get('/')
				.expect('Content-Type', /application\/json/)
				.expect(200, done);
		});
	});
});

