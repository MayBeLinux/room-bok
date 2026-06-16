import { Router, Request, Response } from 'express';

// Import Controller
import { roleController } from '../controllers/roleController';

const router = Router();

router.get('/roles', roleController.listRoles);
router.post('/role', roleController.createRoles);
router.delete('/role/:id', roleController.deleteRoles);
router.put('/role/:id', roleController.updateRoles);

export default router;