import express from 'express';
import validate from 'express-validation';
import paramValidation from './command.validation';
import commandCtrl from './command.controller';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
	/** POST /api/commands - Create new command */
	.post(validate(paramValidation.createCommand), commandCtrl.create);

router.route('/:commandId')
	/** GET /api/commands/:commandId - Get command */
	.get(commandCtrl.get);

/** Load command when API with commandId route parameter is hit */
router.param('commandId', commandCtrl.load);

export default router;
