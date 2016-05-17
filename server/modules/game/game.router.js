import express from 'express';
import validate from 'express-validation';
import paramValidation from './robot.validation';
import robotCtrl from './robot.controller';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
	/** POST /api/robots - Create new robot */
	.post(validate(paramValidation.createRobot), robotCtrl.create);

router.route('/:robotId')
	/** GET /api/robots/:robotId - Get robot */
	.get(robotCtrl.get)

	/** PUT /api/robots/:robotId - Update robot */
	.put(validate(paramValidation.updateRobot), robotCtrl.update);

/** Load robot when API with robotId route parameter is hit */
router.param('robotId', robotCtrl.load);

export default router;
