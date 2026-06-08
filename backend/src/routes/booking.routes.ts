import { Router, Request, Response } from 'express';

// Import Controller
import { bookingController } from '../controllers/bookingController';

const router = Router();

router.get('/bookings', bookingController.listBookings);

export default router;