// This file create the initial booking data to test the DB.

import { AppDataSource } from '../db/data-source';
import { Booking } from '../entity/Booking'

export async function seedBooking() {
    const bookingRepository = AppDataSource.getRepository(Booking)
    const bookingsData = [
        {user_id: 'return joint with user table'},
        {stated_at: Date.now()},
        {ended_at: Date.now() - 120},
    ]
    
}