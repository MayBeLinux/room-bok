import { Router, Request, Response } from 'express';

// Import Controller
import { buildingController } from '../controllers/buildingController';

const router = Router();

router.get('/buildings', buildingController.listBuildings);

export default router;