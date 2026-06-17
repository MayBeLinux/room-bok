import { Router, Request, Response } from 'express';

// Import Controller
import { roomController } from '../controllers/classRoomController';

const router = Router();

router.get('/rooms', roomController.listRooms);
router.get('/rooms/:id', roomController.getRoom);
router.post('/rooms', roomController.createRoom);
router.delete('/rooms/:id', roomController.deleteRoom);
router.put('/rooms/:id', roomController.updateRoom);

export default router;
