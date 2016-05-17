/**
 * Validate the position of the current move,
 * make sure it is within the current game boundaries
 * @param {object} game
 * @param {object} position
 * @returns {boolean}
 */
function validatePosition(game, position) {
	if (position.x < 0 || position.y < 0) return false;

	if (position.x > game.boundaryX) return false;

	if (position.y > game.boundaryY) return false;

	return true;
}

export default { validatePosition };
