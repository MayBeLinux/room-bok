import { Router } from "express";
import { equipmentController } from "../controllers/equipmentController";

const router = Router();

router.get("/equipments", equipmentController.listEquipments);
router.get("/equipments/:id", equipmentController.getEquipment);
router.post("/equipments", equipmentController.createEquipment);
router.put("/equipments/:id", equipmentController.updateEquipment);
router.delete("/equipments/:id", equipmentController.deleteEquipment);

export default router;
