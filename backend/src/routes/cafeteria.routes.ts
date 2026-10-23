import { Router } from "express";
import { cafeteriaController } from "../controllers/cafeteriaController";

const router = Router();

router.get("/cafeterias", cafeteriaController.listCafeterias);
router.get("/cafeterias/:id", cafeteriaController.getCafeteria);

export default router;
