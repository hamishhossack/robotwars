import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Command APIs', () => {
	let robot = {
		name: 'TESTBOT'
	};
	let game = {
		name: 'GAMETEST',
		robots: [],
		boundaryX: 5,
		boundaryY: 5
	};
	let command = {
		robotId: '23423423dsfsdf',
		gameId: '2hb34hk234',
		direction: 'M'
	};

	describe('# POST /api/commands/move', () => {
		it('should create a new movement command', (done) => {
			request(app)
				.post('/api/robots')
				.send(robot)
				.expect(httpStatus.OK)
				.then(resRobot => {
					expect(resRobot.body.name).to.equal(robot.name);
					robot = resRobot.body;
					game.robots.push(robot._id);

					request(app)
						.post('/api/games')
						.send(game)
						.expect(httpStatus.OK)
						.then(resGame => {
							expect(resGame.body.name).to.equal(game.name);
							game = resGame.body;
							command.gameId = game._id;
							command.robotId = robot._id;

							request(app)
								.post('/api/commands/move')
								.send(command)
								.expect(httpStatus.OK)
								.then(resMove => {
									expect(resMove.body._id).to.equal(command.robotId);
									robot = resMove.body;
									done();
								});
						});
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
});
