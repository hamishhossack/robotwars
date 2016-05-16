import Joi from 'joi';

export default {
	// POST /api/robots
	createRobot: {
		body: {
			name: Joi.string().required()
		}
	},

	// UPDATE /api/robots/:robotId
	updateRobot: {
		body: {
			name: Joi.string().required()
		},
		params: {
			robotId: Joi.string().hex().required()
		}
	}
};
