import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Command APIs', () => {
	let robot = {
		name: 'TESTBOT',
		coordinateX: 1,
		coordinateY: 2,
		bearing: 'N'
	};
	let game = {
		name: 'GAMETEST',
		robots: [],
		boundaryX: 5,
		boundaryY: 5
	};
	const command = {
		robotId: '23423423dsfsdf',
		gameId: '2hb34hk234',
		direction: 'M'
	};

	describe('# POST /api/commands/move', () => {
		beforeEach((done) => {
			request(app)
				.post('/api/robots')
				.send(robot)
				.expect(httpStatus.OK)
				.then(res => {
					robot = res.body;
					game.robots.push(robot._id);
					done();
				});
		});

		beforeEach((done) => {
			request(app)
				.post('/api/games')
				.send(game)
				.expect(httpStatus.OK)
				.then(res => {
					game = res.body;
					command.gameId = game._id;
					command.robotId = robot._id;
					done();
				});
		});

		it('should create a new movement command', (done) => {
			request(app)
				.post('/api/commands/move')
				.send(command)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body._id).to.equal(command.robotId);
					expect(res.body.coordinateY).to.equal(3);
					robot = res.body;
					done();
				});
		});
	});

	describe('# GET /api/commands/:commandId', () => {
		it('should report error with message - Not found, when command does not exists', (done) => {
			request(app)
				.get('/api/commands/56c787ccc67fc16ccc1a5e92')
				.expect(httpStatus.NOT_FOUND)
				.then(res => {
					expect(res.body.message).to.equal('Not Found');
					done();
				});
		});
	});

	describe('OpenTable Input testing senario one', () => {
		beforeEach((done) => {
			robot.coordinateX = 1;
			robot.coordinateY = 2;
			robot.bearing = 'N';
			request(app)
				.post('/api/robots')
				.send(robot)
				.expect(httpStatus.OK)
				.then(res => {
					robot = res.body;
					game.robots.push(robot._id);
					done();
				});
		});
		it('should create a new movement with command LMLMLMLMM', (done) => {
			command.position = 'LMLMLMLMM';
			request(app)
				.post('/api/commands/move')
				.send(command)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body._id).to.equal(command.robotId);
					expect(res.body.coordinateY).to.equal(4);
					expect(res.body.coordinateX).to.equal(1);
					expect(res.body.bearing).to.equal('N');
					robot = res.body;
					done();
				});
		});
	});

	describe('OpenTable Input testing senario two', () => {
		beforeEach((done) => {
			robot.coordinateX = 3;
			robot.coordinateY = 3;
			robot.bearing = 'E';
			request(app)
				.post('/api/robots')
				.send(robot)
				.expect(httpStatus.OK)
				.then(res => {
					robot = res.body;
					game.robots.push(robot._id);
					done();
				});
		});
		it('should create a new movement command MMRMMRMRRM', (done) => {
			command.position = 'MMRMMRMRRM';
			request(app)
				.post('/api/commands/move')
				.send(command)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body._id).to.equal(command.robotId);
					expect(res.body.coordinateY).to.equal(5);
					expect(res.body.coordinateX).to.equal(1);
					expect(res.body.bearing).to.equal('N');
					robot = res.body;
					done();
				});
		});
	});
});
