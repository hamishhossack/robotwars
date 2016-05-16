import express from 'express';
import robotRoutes from '../modules/robot/robot.router';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
	res.send('OK')
);

router.use('/robots', robotRoutes);

export default router;
