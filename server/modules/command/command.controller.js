import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import Command from './command.model';
import Game from '../game/game.model';

/**
 * Game Movement for compass cardinal points
 * @type {{N: {y: number}, E: {x: number}, S: {y: number}, W: {x: number}}}
 */
const movement = {
	N: ['posY', 1],
	E: ['posX', 1],
	S: ['posY', -1],
	W: ['posX', -1]
};

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

	command.command = 'MOVE';
	command.value = 'F';
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

				_moveRobotForward(robot).then(() => {
					res.json(saveCommand);
				});
			}).error((e) => next(e));
		})
		.error((e) => next(e));
}

function _moveRobotForward(robot) {
	const coordinateMove = movement[robot.bearing];
	const currentAxisPos = robot[coordinateMove[0]];

	robot[coordinateMove[0]] = currentAxisPos - coordinateMove[1]; // TODO : get correct math
}

function rotate(req, res) {
	res.json(req.body);
}

export default { load, get, move, rotate };
