import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import instructions from '../../helpers/instructions';
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
				let position = {
					bearing: robot.bearing,
					x: robot.coordinateX,
					y: robot.coordinateY
				};

				if (!robot) {
					const err = new APIError('No such robot exists in this game!', httpStatus.NOT_FOUND);
					return next(err);
				}

				if (instructions.hasOwnProperty(saveCommand.direction)) {
					position = instructions[saveCommand.direction](position);
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
