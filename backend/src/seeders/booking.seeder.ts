// This file create the initial booking data to test the DB.

import { AppDataSource } from '../db/data-source';
import { Booking } from '../entity/Booking'

export async function seedBooking() {
    const bookingRepository = AppDataSource.getRepository(Booking)

    // To have the possibilies to create a Booking table, i must create a userData and insert it
    // maybe try to create new random data
    const userData = {id : 1, firstName: 'Christophe' , lastName: 'Test', email: 'test@gmail.com', password: 'Test Test'}
    const bookingsData = [
        {user: userData, startedAt: Date.now(), endedAt: Date.now()},
        {user: userData, startedAt: Date.now(), endedAt: Date.now()},
        {user: userData, startedAt: Date.now(), endedAt: Date.now()},
    ]
    for (const bookingData of bookingsData) {
        const booking = bookingRepository.create(bookingData)
        await bookingRepository.save(booking)
        console.log("Booking created ", bookingData )
    }
}