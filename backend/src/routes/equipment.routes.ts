import { Router, Request, Response } from 'express';

// Import Controller
import { equipmentController } from '../controllers/equipmentController';

const router = Router();

router.get('/equipments', equipmentController.listEquipments);

export default router;