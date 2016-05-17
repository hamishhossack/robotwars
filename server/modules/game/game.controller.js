import Game from './game.model';
import config from '../../../config/env';

/**
 * Load Game and append to req
 */
function load(req, res, next, id) {
	Game.get(id).then((game) => {
		req.game = game;				// eslint-disable-line no-param-reassign
		next();
	}).error((e) => next(e));
}

/**
 * Get game
 * @returns {Game}
 */
function get(req, res) {
	res.json(req.game);
}

/**
 * Update existing user
 * @property {string} req.body.name - The name of game.
 * @returns {Game}
 */
function create(req, res, next) {
	const game = new Game();

	game.name = req.body.name;
	game.boundaryX = req.body.boundaryX || config.game.boundaryX; // Use defaults
	game.boundaryY = req.body.boundaryY || config.game.boundaryY; // Use defaults

	game.saveAsync()
		.then((saveGame) => res.json(saveGame))
		.error((e) => next(e));
}

/**
 * Update existing game
 * @property {integer} req.body.name
 * @returns {Game}
 */
function update(req, res, next) {
	const game = req.game;

	game.name = req.body.name;

	game.saveAsync()
		.then((savedGame) => {
			res.json(savedGame);
		})
		.error((e) => next(e));
}

export default { load, get, create, update };
