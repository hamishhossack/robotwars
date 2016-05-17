import Joi from 'joi';

export default {
	// POST /api/commands/move
	commandMove: {
		body: {
			robotId: Joi.string().hex().required(),
			gameId: Joi.string().hex().required()
		}
	},

	// POST /api/commands/rotate
	commandRotate: {
		body: {
			robotId: Joi.string().hex().required(),
			gameId: Joi.string().hex().required(),
			direction: Joi.string().required()
		}
	}
};
