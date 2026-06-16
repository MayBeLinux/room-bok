import { Router, Request, Response } from 'express';

// Import Controller
import { equipmentController } from '../controllers/equipmentController';

const router = Router();

router.get('/equipments', equipmentController.listEquipments);
router.post('/equipment', equipmentController.createEquipments);
router.delete('/equipment/:id', equipmentController.deleteEquipments);
router.put('/equipment/:id', equipmentController.updateEquipments);
export default router;