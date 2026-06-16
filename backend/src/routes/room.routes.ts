import { Router, Request, Response } from 'express';

// Import Controller
import { roomController } from '../controllers/roomController';

const router = Router();

router.get('/rooms', roomController.listRooms);
router.post('/room', roomController.createRooms);
router.delete('/room/:id', roomController.deleteRooms);
router.put('/room/:id', roomController.updateRooms);

export default router;