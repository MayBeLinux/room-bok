import { Router, Request, Response } from 'express';

// Import Controller
import { buildingController } from '../controllers/buildingController';

const router = Router();

router.get('/buildings', buildingController.listBuildings);
router.get('/buildings/:id', buildingController.getBuilding);
router.post('/building', buildingController.createBuilding);
router.delete('/building/:id', buildingController.deleteBuilding)
router.put('/building/:id', buildingController.updateBuilding)

export default router;