// Booking return a list of booking with date start and date end.
// ******************
// - user_id        *
// - classroom_id   *
// - started_at     *
// - ended_at       *
// ******************
import { AppDataSource } from '../db/data-source';
import { Request , Response } from 'express';
import { Booking } from '../entity/Booking';
import { createBookingSchema, updateBookingSchema, bookingIdParamSchema } from '../dto/BookingDto';

// Get the repository for the Booking entity
const bookingRepository = AppDataSource.getRepository(Booking);

export const bookingController = {
    listBookings: async (req: Request, res: Response) => {
        const bookings = await bookingRepository.find();
        res.json(bookings);
    },
    getBooking: async (req: Request, res: Response) => {
        const parsedParams = bookingIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const { id } = parsedParams.data
        const booking = await bookingRepository.findOne({
            where: { id },
            relations: { user: true, classroom: true },
        })
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' })
        }
        res.json(booking)
    },
    createBookings: async (req: Request, res: Response) => {
        const parsed = createBookingSchema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.issues })
        } else {
            const { user_id, classroom_id, started_at, ended_at } = parsed.data
            const createBooking = bookingRepository.create({
                user: { id : user_id },
                classroom: { id : classroom_id },
                startedAt: started_at,
                endedAt: ended_at
            });
            await bookingRepository.save(createBooking);
            res.status(201).json(createBooking);
        }
    },
    deleteBookings: async (req: Request, res: Response) => {
        const parsedParams = bookingIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        } else {
            const { id } = parsedParams.data
            const deleted = await bookingRepository.delete(id)

            if (deleted.affected === 0 ) {
                res.status(404).json(deleted)
            } else {
                res.status(204).json(deleted)
            }
        }
    },
    updateBookings: async (req: Request, res: Response) => {
        const parsedParams = bookingIdParamSchema.safeParse(req.params)
        if (!parsedParams.success) {
            return res.status(400).json({ errors: parsedParams.error.issues })
        }
        const parsedBody = updateBookingSchema.safeParse(req.body)
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.issues })
        }
        const { id } = parsedParams.data
        const { user_id, classroom_id, started_at, ended_at } = parsedBody.data
        const update = await bookingRepository.update(id, {
            user: user_id ? { id: user_id } : undefined,
            classroom: classroom_id ? { id: classroom_id } : undefined,
            startedAt: started_at,
            endedAt: ended_at,
        })

        if (update.affected === 0) {
            res.status(404).json(update)
        } else {
            res.status(200).json(update)
        }
    }
}