import { Router, Request, Response } from 'express';

// Import Controller
import { floorController } from '../controllers/floorController';

const router = Router();

router.get('/floors', floorController.listFloors);

export default router;