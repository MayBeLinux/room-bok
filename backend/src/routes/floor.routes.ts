import { Router, Request, Response } from 'express';

// Import Controller
import { floorController } from '../controllers/floorController';

const router = Router();

router.get('/floors', floorController.listFloors);
router.post('/floor', floorController.createFloors);
router.delete('/floor/:id', floorController.deleteFloors);
router.put('/floor/:id', floorController.updateFloors)

export default router;