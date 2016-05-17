import express from 'express';
import validate from 'express-validation';
import paramValidation from './game.validation';
import gameCtrl from './game.controller';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
	/** POST /api/games - Create new game */
	.post(validate(paramValidation.createGame), gameCtrl.create);

router.route('/:gameId')
	/** GET /api/games/:gameId - Get game */
	.get(gameCtrl.get)

	/** PUT /api/games/:gameId - Update game */
	.put(validate(paramValidation.updateGame), gameCtrl.update);

/** Load game when API with gameId route parameter is hit */
router.param('gameId', gameCtrl.load);

export default router;
