import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Game APIs', () => {
	let robot = {
		name: 'testbot'
	};
	let game = {
		name: 'GAME1',
		robots: [],
		boundaryX: 5,
		boundaryY: 5
	};

	describe('# POST /api/games', () => {
		it('should create a new game', (done) => {
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
							done();
						});
				});
		});
	});

	describe('# GET /api/games/:gameId', () => {
		it('should get game details', (done) => {
			request(app)
				.get(`/api/games/${game._id}`)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.name).to.equal(game.name);
					expect(res.body.boundaryX).to.equal(game.boundaryX);
					expect(res.body.boundaryY).to.equal(game.boundaryY);
					done();
				});
		});

		it('should report error with message - Not found, when game does not exists', (done) => {
			request(app)
				.get('/api/games/56c787ccc67fc16ccc1a5e92')
				.expect(httpStatus.NOT_FOUND)
				.then(res => {
					expect(res.body.message).to.equal('Not Found');
					done();
				});
		});
	});

	describe('# PUT /api/games/:gameId', () => {
		it('should update game details', (done) => {
			game.name = 'GAME2';
			game.boundariesX = 3;
			game.boundariesY = 8;
			request(app)
				.put(`/api/games/${game._id}`)
				.send(game)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.name).to.equal('GAME2');
					done();
				});
		});
	});
});
