const router = require('express').Router()
const {catchErrors} = require('../handlers/error-handlers')
const messageController = require('../controllers/message.controller')
const auth = require("../middlewares/auth")

router.get('/', auth, catchErrors(messageController.getMessages))
module.exports = router
