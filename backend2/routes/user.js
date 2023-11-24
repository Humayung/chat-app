import { Router } from 'express';
import {catchErrors} from '../handlers/error-handlers.js';
import userController from '../controllers/user.controller.js';

const router = Router();

router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));

export default router;