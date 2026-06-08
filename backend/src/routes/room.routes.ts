import { Router, Request, Response } from 'express';

// Import Controller
import { roomController } from '../controllers/roomController';

const router = Router();

router.get('/rooms', roomController.listRooms);

export default router;