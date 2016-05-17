import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';

/**
 * User Schema
 */
const CommandSchema = new mongoose.Schema({
	command: {
		type: String,
		required: true
	},
	robotId: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	gameId: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	value: {
		type: String,
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
CommandSchema.method({});

/**
 * Statics
 */
CommandSchema.statics = {
	/**
	 * Get command
	 * @param {ObjectId} id - The objectId of command.
	 * @returns {Promise<Command, APIError>}
	 */
	get(id) {
		return this.findById(id)
			.execAsync().then((command) => {
				if (command) {
					return command;
				}
				const err = new APIError('No such command exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	}
};

/**
 * @typedef Command
 */
export default mongoose.model('Command', CommandSchema);
