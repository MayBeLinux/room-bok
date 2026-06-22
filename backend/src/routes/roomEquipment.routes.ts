import { Router } from "express";
import { roomEquipmentController } from "../controllers/classRoomEquipmentController";

const router = Router();

router.get("/classroom-equipments", roomEquipmentController.listRoomEquipment);
router.get(
	"/classroom-equipments/:idClassroom/:idEquipment",
	roomEquipmentController.getRoomEquipment,
);
router.post("/classroom-equipments", roomEquipmentController.createRoomEquipment);
router.put(
	"/classroom-equipments/:idClassroom/:idEquipment",
	roomEquipmentController.updateRoomEquipment,
);
router.delete(
	"/classroom-equipments/:idClassroom/:idEquipment",
	roomEquipmentController.deleteRoomEquipment,
);

export default router;
