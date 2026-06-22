import { Router } from "express";
import { roomController } from "../controllers/classRoomController";

const router = Router();

router.get("/rooms", roomController.listRooms);
router.get("/rooms/:id", roomController.getRoom);
router.post("/rooms", roomController.createRoom);
router.put("/rooms/:id", roomController.updateRoom);
router.delete("/rooms/:id", roomController.deleteRoom);

export default router;
