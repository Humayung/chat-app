import { Router } from 'express';
import {catchErrors} from '../handlers/error-handlers.js';
import associatedChatroomController from '../controllers/associatedChatroom.controller.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/chatrooms', auth, catchErrors(associatedChatroomController.getAssociatedChatrooms));
router.get('/users/:chatroomId', auth, catchErrors(associatedChatroomController.getAssociatedUsers));

export default router;