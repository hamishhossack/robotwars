import Joi from 'joi';

export default {
	// POST /api/games
	createGame: {
		body: {
			name: Joi.string().required(),
			boundaryX: Joi.number().required(),
			boundaryY: Joi.number().required(),
			robots: Joi.array().items(Joi.string())
		}
	},

	// UPDATE /api/games/:gameId
	updateGame: {
		body: {
			name: Joi.string(),
			boundaryX: Joi.number(),
			boundaryY: Joi.number(),
			robots: Joi.array().items(Joi.string())
		},
		params: {
			gameId: Joi.string().hex().required()
		}
	}
};
