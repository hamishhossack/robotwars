import Joi from 'joi';

export default {
	// POST /api/commands/move/:direction
	commandMove: {
		body: {
			robotId: Joi.string().hex().required(),
			gameId: Joi.string().hex().required(),
			direction: Joi.string().required()
		}
	}
};
