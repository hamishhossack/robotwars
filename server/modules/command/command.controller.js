import Command from './command.model';

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
function create(req, res, next) {
	const command = new Command();

	command.command = req.body.command;
	command.robotId = req.body.robotId;
	command.gameId = req.body.gameId;
	command.value = req.body.value;

	command.saveAsync()
		.then((saveCommand) => {



			res.json(saveCommand);
		})
		.error((e) => next(e));
}

export default { load, get, create };
