import { Router, Request, Response } from 'express';

// Import Controller
import { bookingController } from '../controllers/bookingController';

const router = Router();

router.get('/bookings', bookingController.listBookings);
router.post('/booking', bookingController.createBooking);
router.delete('/booking/:id', bookingController.deleteBooking)
router.put('/booking/:id', bookingController.updateBooking)

export default router;