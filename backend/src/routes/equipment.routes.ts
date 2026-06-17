import { Router, Request, Response } from 'express';

// Import Controller
import { equipmentController } from '../controllers/equipmentController';

const router = Router();

router.get('/equipments', equipmentController.listEquipments);
router.get('/equipments/:id', equipmentController.getEquipment);
router.post('/equipments', equipmentController.createEquipment);
router.delete('/equipments/:id', equipmentController.deleteEquipment);
router.put('/equipments/:id', equipmentController.updateEquipment);

export default router;
