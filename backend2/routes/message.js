import { Router } from 'express';
import {catchErrors} from '../handlers/error-handlers.js';
import messageController from '../controllers/message.controller.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', auth, catchErrors(messageController.getMessages));
router.post('/', auth, catchErrors(messageController.sendMessage));
router.post('/send-private', auth, catchErrors(messageController.sendPrivateMessage));

export default router;