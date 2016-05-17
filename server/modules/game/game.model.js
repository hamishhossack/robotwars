import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';

/**
 * User Schema
 */
const RobotSchema = new mongoose.Schema({
	name: {
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
RobotSchema.method({});

/**
 * Statics
 */
RobotSchema.statics = {
	/**
	 * Get robot
	 * @param {ObjectId} id - The objectId of robot.
	 * @returns {Promise<Robot, APIError>}
	 */
	get(id) {
		return this.findById(id)
			.execAsync().then((robot) => {
				if (robot) {
					return robot;
				}
				const err = new APIError('No such robot exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	}
};

/**
 * @typedef Robot
 */
export default mongoose.model('Robot', RobotSchema);
