import Robot from './robot.model';

/**
 * Load Robot and append to req
 */
function load(req, res, next, id) {
	Robot.get(id).then((robot) => {
		req.robot = robot;				// eslint-disable-line no-param-reassign
		next();
	}).error((e) => next(e));
}

/**
 * Get robot
 * @returns {Robot}
 */
function get(req, res) {
	res.json(req.robot);
}

/**
 * Update existing user
 * @property {string} req.body.name - The name of robot.
 * @returns {Robot}
 */
function create(req, res, next) {
	const robot = new Robot();

	robot.name = req.body.name;
	robot.posX = 0;
	robot.posY = 0;
	robot.bearing = 'N';

	robot.saveAsync()
		.then((saveRobot) => res.json(saveRobot))
		.error((e) => next(e));
}

/**
 * Update existing robot
 * @property {integer} req.body.x - The x position of robot.
 * @property {integer} req.body.y - The y position of robot.
 * @returns {Robot}
 */
function update(req, res, next) {
	const robot = req.robot;

	robot.name = req.body.name;

	robot.saveAsync()
		.then((savedRobot) => {
			res.json(savedRobot);
		})
		.error((e) => next(e));
}

export default { load, get, create, update };
