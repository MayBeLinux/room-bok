import { Router, Request, Response } from 'express'; 

// Import Controller
import { roleController } from '../controllers/roleController';

const router = Router();

router.get('/role', roleController.listRoles);

export default router;