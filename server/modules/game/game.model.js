import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';

/**
 * User Schema
 */
const GameSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	boundaryX: {
		type: Number,
		required: true
	},
	boundaryY: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
GameSchema.method({});

/**
 * Statics
 */
GameSchema.statics = {
	/**
	 * Get game
	 * @param {ObjectId} id - The objectId of game.
	 * @returns {Promise<Game, APIError>}
	 */
	get(id) {
		return this.findById(id)
			.execAsync().then((game) => {
				if (game) {
					return game;
				}
				const err = new APIError('No such game exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	}
};

/**
 * @typedef Game
 */
export default mongoose.model('Game', GameSchema);
