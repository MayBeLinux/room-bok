import { Router } from "express";
import { floorController } from "../controllers/floorController";

const router = Router();

router.get("/floors", floorController.listFloors);
router.get("/floors/:id", floorController.getFloor);
router.post("/floors", floorController.createFloor);
router.put("/floors/:id", floorController.updateFloor);
router.delete("/floors/:id", floorController.deleteFloor);

export default router;
