/**
 * Move instruction to get the next clean space
 * @param position
 * @returns {*}
 * @constructor
 */
function M(position) {
	const newPosition = position;
	const bearing = position.bearing;
	let x = position.x;
	let y = position.y;

	switch (bearing) {
		case 'E' :
			++x;
			break;
		case 'N' :
			++y;
			break;
		case 'S' :
			--y;
			break;
		case 'W' :
			--x;
			break;
		default:
			break;
	}

	newPosition.x = x;
	newPosition.y = y;

	return newPosition;
}

/**
 * Rotate instruction to get the right cardinal after left rotation
 * @param position
 * @returns {*}
 * @constructor
 */
function L(position) {
	const newPosition = position;
	const current = position.bearing;

	switch (current) {
		case 'E' :
			newPosition.bearing = 'N';
			break;
		case 'N' :
			newPosition.bearing = 'W';
			break;
		case 'S' :
			newPosition.bearing = 'E';
			break;
		case 'W' :
			newPosition.bearing = 'S';
			break;
		default:
			break;
	}

	return newPosition;
}

/**
 * Rotate instruction to get the right cardinal after right rotation
 * @param position
 * @returns {*}
 * @constructor
 */
function R(position) {
	const newPosition = position;
	const current = position.bearing;

	switch (current) {
		case 'E' :
			newPosition.bearing = 'S';
			break;
		case 'N' :
			newPosition.bearing = 'E';
			break;
		case 'S' :
			newPosition.bearing = 'W';
			break;
		case 'W' :
			newPosition.bearing = 'N';
			break;
		default:
			break;
	}

	return newPosition;
}

export default { L, M, R };
