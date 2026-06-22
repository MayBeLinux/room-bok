import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.get("/users", userController.listUsers);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
