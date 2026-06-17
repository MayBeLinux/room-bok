import { Router, Request, Response } from 'express';

// Import Controller
import { roleController } from '../controllers/roleController';

const router = Router();

router.get('/roles', roleController.listRoles);
router.get('/role/:id', roleController.getRole);
router.post('/role', roleController.createRoles);
router.put('/role/:id', roleController.updateRoles);
router.delete('/role/:id', roleController.deleteRoles);

export default router;