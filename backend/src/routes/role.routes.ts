import { Router, Request, Response } from 'express';

// Import Controller
import { roleController } from '../controllers/roleController';

const router = Router();

router.get('/roles', roleController.listRoles);

export default router;