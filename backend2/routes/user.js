const router = require('express').Router()
const {catchErrors} = require('../handlers/error-handlers')
const userController = require('../controllers/user.controller')


router.post("/login", catchErrors(userController.login))
router.post("/register", catchErrors(userController.register))
module.exports = router
