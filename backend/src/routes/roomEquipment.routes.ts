import { Router, Request, Response } from 'express';

// Import Controller
import { roomEquipmentController } from '../controllers/roomEquipmentController';

const router = Router();

router.get('/classroom-equipments', roomEquipmentController.listRoomEquipment);

export default router;