import { Router, Request, Response } from 'express';

// Import Controller
import { roomEquipmentController } from '../controllers/classRoomEquipmentController';

const router = Router();

router.get('/classroom-equipments', roomEquipmentController.listRoomEquipment);
router.get('/classroom-equipment/:idClassroom/:idEquipment', roomEquipmentController.getRoomEquipment);
router.post('/classroom-equipment', roomEquipmentController.createRoomEquipment);
router.delete('/classroom-equipment/:idClassroom/:idEquipment', roomEquipmentController.deleteRoomEquipment);
router.put('/classroom-equipment/:idClassroom/:idEquipment', roomEquipmentController.updateRoomEquipment);

export default router;