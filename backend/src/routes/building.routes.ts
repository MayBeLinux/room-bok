import { Router, Request, Response } from 'express';

// Import Controller
import { buildingController } from '../controllers/buildingController';

const router = Router();

router.get('/buildings', buildingController.listBuildings);
router.get('/building/:id', buildingController.getBuilding);
router.post('/building', buildingController.createBuildings);
router.delete('/building/:id', buildingController.deleteBuildings)
router.put('/building/:id', buildingController.updateBuildings)

export default router;