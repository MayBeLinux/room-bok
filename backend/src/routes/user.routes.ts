import { Router, Request, Response } from 'express';

// Import Controller
import { userController } from '../controllers/userController';

const router = Router();

router.get('/users', userController.listUsers);

export default router;