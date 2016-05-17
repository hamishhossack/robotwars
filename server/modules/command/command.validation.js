import Joi from 'joi';

export default {
	// POST /api/commands
	createCommand: {
		body: {
			robotId: Joi.string().required(),
			gameId: Joi.string().required(),
			command: Joi.string().required(),
			value: Joi.string().required()
		}
	}
};
