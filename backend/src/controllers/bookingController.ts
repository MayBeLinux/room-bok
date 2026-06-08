// Booking return a list of booking with date start and date end.
// ******************
// - user_id        *
// - started_at     *
// - ended_at       *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Booking } from '../entity/Booking';

// Get the repository for the Booking entity
const bookingRepository = AppDataSource.getRepository(Booking);

export const bookingController = {
    listBookings: async (req: Request, res: Response) => {
        const bookings = await bookingRepository.find();
        res.json(bookings);
    },
    createBookings: async (req: Request, res: Response) => {
        const { user_id, classroom_id, started_at, ended_at } = req.body;
        const createBooking = bookingRepository.create({
            user: { id : user_id },
            classroom: { id : classroom_id },
            startedAt: started_at,
            endedAt: ended_at
        });
        await bookingRepository.save(createBooking);
        res.status(201).json(createBooking);
    }
}