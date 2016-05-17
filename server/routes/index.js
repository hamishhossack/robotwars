import express from 'express';
import robotRoutes from '../modules/robot/robot.router';
import gameRoutes from '../modules/game/game.router';
import commandRoutes from '../modules/command/command.router';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
	res.send('OK')
);

/** Setup All /robots routes **/
router.use('/robots', robotRoutes);
/** Setup All /games routes **/
router.use('/games', gameRoutes);
/** Setup All /command routes **/
router.use('/commands', commandRoutes);

export default router;
