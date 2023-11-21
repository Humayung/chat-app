import apiController from './controller/api.controller.js'
import {Router} from 'express'
const router = Router()

router.get('/', apiController.index)

export default router
