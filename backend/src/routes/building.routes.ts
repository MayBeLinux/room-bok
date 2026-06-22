import { Router } from "express";
import { buildingController } from "../controllers/buildingController";

const router = Router();

router.get("/buildings", buildingController.listBuildings);
router.get("/buildings/:id", buildingController.getBuilding);
router.post("/buildings", buildingController.createBuilding);
router.put("/buildings/:id", buildingController.updateBuilding);
router.delete("/buildings/:id", buildingController.deleteBuilding);

export default router;
