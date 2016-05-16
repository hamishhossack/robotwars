import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Robot APIs', () => {
	let robot = {
		name: 'KK123'
	};

	describe('# POST /api/robots', () => {
		it('should create a new robot', (done) => {
			request(app)
				.post('/api/robots')
				.send(robot)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.name).to.equal(robot.name);
					robot = res.body;
					done();
				});
		});
	});

	describe('# GET /api/robots/:robotId', () => {
		it('should get robot details', (done) => {
			request(app)
				.get(`/api/robots/${robot._id}`)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.name).to.equal(robot.name);
					done();
				});
		});

		it('should report error with message - Not found, when robot does not exists', (done) => {
			request(app)
				.get('/api/robots/56c787ccc67fc16ccc1a5e92')
				.expect(httpStatus.NOT_FOUND)
				.then(res => {
					expect(res.body.message).to.equal('Not Found');
					done();
				});
		});
	});

	describe('# PUT /api/robots/:robotId', () => {
		it('should update robot details', (done) => {
			robot.name = 'KK';
			request(app)
				.put(`/api/robots/${robot._id}`)
				.send(robot)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.name).to.equal('KK');
					done();
				});
		});
	});
});
