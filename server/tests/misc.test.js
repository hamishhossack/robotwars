import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';
import instructors from '../helpers/instructions';
import validators from '../helpers/validators';

chai.config.includeStack = true;

const position = {
	x: 0,
	y: 0,
	bearing: 'N'
};

const game = {
	boundaryX: 5,
	boundaryY: 5
};

describe('## Misc', () => {
	describe('# GET /api/health-check', () => {
		it('should return OK', (done) => {
			request(app)
				.get('/api/health-check')
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.text).to.equal('OK');
					done();
				});
		});
	});

	describe('# GET /api/404', () => {
		it('should return 404 status', (done) => {
			request(app)
				.get('/api/404')
				.expect(httpStatus.NOT_FOUND)
				.then(res => {
					expect(res.body.message).to.equal('Not Found');
					done();
				});
		});
	});

	describe('Instructor movement M', () => {
		it('should return position y=1;x=0', (done) => {
			const result = instructors.M(position);			// eslint-disable-line new-cap
			expect(result.x).to.equal(0);
			expect(result.y).to.equal(1);
			done();
		});
	});

	describe('Instructor movement L', () => {
		it('should return E', (done) => {
			position.bearing = 'S';
			const result = instructors.L(position);			// eslint-disable-line new-cap
			expect(result.bearing).to.equal('E');
			done();
		});
	});

	describe('Instructor movement R', () => {
		it('should return W', (done) => {
			position.bearing = 'S';
			const result = instructors.R(position);			// eslint-disable-line new-cap
			expect(result.bearing).to.equal('W');
			done();
		});
	});

	describe('Position validator', () => {
		it('should return true', (done) => {
			const result = validators.validatePosition(game, position);
			expect(result).to.equal(true);
			done();
		});
		it('should return false', (done) => {
			position.x = -1;
			const result = validators.validatePosition(game, position);
			expect(result).to.equal(false);
			done();
		});
		it('should return false', (done) => {
			position.y = 5;
			const result = validators.validatePosition(game, position);
			expect(result).to.equal(false);
			done();
		});
	});
});
