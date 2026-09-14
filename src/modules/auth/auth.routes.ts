import express from 'express';
const router = express.Router();

import authController from './auth.controller.js';
import { loginLimiter } from '../../middlewares/rate-limiters.middleware.js';

router.post('/login', loginLimiter, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

export default router;