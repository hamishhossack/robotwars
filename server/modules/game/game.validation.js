import Joi from 'joi';

export default {
	// POST /api/games
	createGame: {
		body: {
			name: Joi.string().required(),
			boundaryX: Joi.number().required(),
			boundaryY: Joi.number().required()
		}
	},

	// UPDATE /api/games/:gameId
	updateGame: {
		body: {
			name: Joi.string(),
			boundaryX: Joi.number(),
			boundaryY: Joi.number()
		},
		params: {
			gameId: Joi.string().hex().required()
		}
	}
};
