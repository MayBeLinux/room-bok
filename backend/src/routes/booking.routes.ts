import { Router, Request, Response } from 'express';

// Import Controller
import { bookingController } from '../controllers/bookingController';

const router = Router();

router.get('/bookings', bookingController.listBookings);
router.get('/booking/:id', bookingController.getBooking);
router.post('/booking', bookingController.createBookings);
router.delete('/booking/:id', bookingController.deleteBookings)
router.put('/booking/:id', bookingController.updateBookings)

export default router;