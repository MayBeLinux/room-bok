import { Router } from "express";
import { roleController } from "../controllers/roleController";

const router = Router();

router.get("/roles", roleController.listRoles);
router.get("/roles/:id", roleController.getRole);
router.post("/roles", roleController.createRole);
router.put("/roles/:id", roleController.updateRole);
router.delete("/roles/:id", roleController.deleteRole);

export default router;
