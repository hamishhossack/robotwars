import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

describe('## Command APIs', () => {
	let command = {
		command: 'MOVE',
		robotId: '23423423dsfsdf',
		gameId: '2hb34hk234',
		value: 'L'
	};

	describe('# POST /api/commands', () => {
		it('should create a new command', (done) => {
			request(app)
				.post('/api/commands')
				.send(command)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.command).to.equal(command.command);
					expect(res.body.robotId).to.equal(command.robotId);
					expect(res.body.gameId).to.equal(command.gameId);
					expect(res.body.value).to.equal(command.value);
					command = res.body;
					done();
				});
		});
	});

	describe('# GET /api/commands/:commandId', () => {
		it('should get command details', (done) => {
			request(app)
				.get(`/api/commands/${command._id}`)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body.command).to.equal(command.command);
					expect(res.body.robotId).to.equal(command.robotId);
					expect(res.body.gameId).to.equal(command.gameId);
					expect(res.body.value).to.equal(command.value);
					done();
				});
		});

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
