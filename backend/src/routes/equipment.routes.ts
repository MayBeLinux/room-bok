import { Router, Request, Response } from 'express';

// Import Controller
import { equipmentController } from '../controllers/equipmentController';

const router = Router();

router.get('/equipments', equipmentController.listEquipments);
router.post('/equipment', equipmentController.createEquipment);
router.delete('/equipment/:id', equipmentController.deleteEquipment);
router.put('/equipment/:id', equipmentController.updateEquipment);
export default router;