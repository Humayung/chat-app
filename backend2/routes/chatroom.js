import {Router} from 'express'
import {catchErrors} from '../handlers/error-handlers.js'
import chatroomController from '../controllers/chatroom.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth, catchErrors(chatroomController.createChatroom))
router.get('/', auth, catchErrors(chatroomController.getAllChatroom))
router.get('/:chatroomId', auth, catchErrors(chatroomController.getChatroom))
router.post('/private', auth, catchErrors(chatroomController.createPrivateChatroom))

export default router
