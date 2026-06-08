// Booking return a list of booking with date start and date end.
// ******************
// - user_id        *
// - started_at     *
// - ended_at       *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Booking } from '../entity/Booking';

export const bookingController = {
    listBookings: async (req: Request, res: Response) => {
        const bookings = await AppDataSource.getRepository(Booking).find();
        res.json(bookings);
    }
}