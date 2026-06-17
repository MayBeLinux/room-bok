import { Router, Request, Response } from 'express';

// Import Controller
import { userController } from '../controllers/userController';

const router = Router();

router.get('/users', userController.listUsers);
router.post('/user', userController.createUser);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.updateUser);

export default router;