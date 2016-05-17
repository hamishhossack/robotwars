import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import instructions from '../../helpers/instructions';
import validator from '../../helpers/validators';
import Command from './command.model';
import Game from '../game/game.model';

/**
 * Load Command and append to req
 */
function load(req, res, next, id) {
	Command.get(id).then((command) => {
		req.command = command;				// eslint-disable-line no-param-reassign
		next();
	}).error((e) => next(e));
}

/**
 * Get command
 * @returns {Command}
 */
function get(req, res) {
	res.json(req.command);
}

/**
 * Update existing user
 * @property {string} req.body.name - The name of command.
 * @returns {Command}
 */
function move(req, res, next) {
	const command = new Command();

	command.direction = req.body.direction;
	command.robotId = req.body.robotId;
	command.gameId = req.body.gameId;

	command.saveAsync()
		.then((saveCommand) => {
			Game.getWithRobot(saveCommand.gameId, saveCommand.robotId).then((game) => {
				const robot = game.robots[0];

				if (!robot) {
					const err = new APIError('No such robot exists in this game!', httpStatus.NOT_FOUND);
					return next(err);
				}

				let position = {
					bearing: robot.bearing,
					x: robot.coordinateX,
					y: robot.coordinateY
				};

				const robotMovements = saveCommand.direction.split('');

				robotMovements.forEach((movement) => {
					if (instructions.hasOwnProperty(movement)) {
						position = instructions[movement](position);
					}
				});

				if (!validator.validatePosition(game, position)) {
					const err = new APIError('This position is not in the arena!', httpStatus.NOT_FOUND);
					return next(err);
				}

				robot.coordinateX = position.x;
				robot.coordinateY = position.y;
				robot.bearing = position.bearing;

				robot.saveAsync().then((savedRobot) => {
					res.json(savedRobot);
				}).error((e) => next(e));
			}).error((e) => next(e));
		}).error((e) => next(e));
}

export default { load, get, move };
