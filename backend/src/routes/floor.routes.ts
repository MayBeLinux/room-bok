import { Router, Request, Response } from 'express';

// Import Controller
import { floorController } from '../controllers/floorController';

const router = Router();

router.get('/floors', floorController.listFloors);
router.get('/floors/:id', floorController.getFloor);
router.post('/floor', floorController.createFloor);
router.delete('/floor/:id', floorController.deleteFloor);
router.put('/floor/:id', floorController.updateFloor)

export default router;