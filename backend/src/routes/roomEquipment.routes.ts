import { Router, Request, Response } from 'express';

// Import Controller
import { roomEquipmentController } from '../controllers/classRoomEquipmentController';

const router = Router();

router.get('/classroom-equipments', roomEquipmentController.listRoomEquipment);
router.get('/classroom-equipments/:idClassroom/:idEquipment', roomEquipmentController.getRoomEquipment);
router.post('/classroom-equipments', roomEquipmentController.createRoomEquipment);
router.delete('/classroom-equipments/:idClassroom/:idEquipment', roomEquipmentController.deleteRoomEquipment);
router.put('/classroom-equipments/:idClassroom/:idEquipment', roomEquipmentController.updateRoomEquipment);

export default router;
