const router = require('express').Router()
const {catchErrors} = require('../handlers/error-handlers')
const chatroomController = require('../controllers/chatroom.controller')
const auth = require("../middlewares/auth")

router.post('/', auth, catchErrors(chatroomController.createChatroom))
router.get('/', auth, catchErrors(chatroomController.getAllChatroom))
router.get('/:chatroomId', auth, catchErrors(chatroomController.getChatroom))
module.exports = router
