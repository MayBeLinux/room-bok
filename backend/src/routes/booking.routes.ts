import { Router } from "express";
import { bookingController } from "../controllers/bookingController";

const router = Router();

router.get("/bookings", bookingController.listBookings);
router.get("/bookings/:id", bookingController.getBooking);
router.post("/bookings", bookingController.createBooking);
router.put("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);

export default router;
