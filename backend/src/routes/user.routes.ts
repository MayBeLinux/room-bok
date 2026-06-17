import { Router, Request, Response } from 'express';

// Import Controller
import { userController } from '../controllers/userController';

const router = Router();

router.get('/users', userController.listUsers);
router.get('/user/:id', userController.getUser);
router.post('/user', userController.createUsers);
router.delete('/user/:id', userController.deleteUsers);
router.put('/user/:id', userController.updateUsers);

export default router;