const router = require('express').Router()
const {catchErrors} = require('../handlers/error-handlers')
const associatedChatroomController = require('../controllers/associatedChatroom.controller')
const auth = require("../middlewares/auth")

router.get('/chatrooms', auth, catchErrors(associatedChatroomController.getAssociatedChatrooms))
router.get('/users/:chatroomId', auth, catchErrors(associatedChatroomController.getAssociatedUsers))
module.exports = router
