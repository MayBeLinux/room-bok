// This file creates the initial bookings to test the DB.

import { AppDataSource } from "../db/data-source";
import { Booking } from "../entity/Booking";
import { User } from "../entity/User";
import { Classroom } from "../entity/Classroom";

export async function seedBookings() {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const userRepository = AppDataSource.getRepository(User);
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const users = await userRepository.find();
    const classrooms = await classroomRepository.find();

    if (users.length === 0 || classrooms.length === 0) {
        console.warn("No users or classrooms found — skipping booking seeding.");
        return;
    }

    const now = new Date();
    const oneHour = 60 * 60 * 1000;

    const bookingsData = [
        {
            user: users[0],
            classroom: classrooms[0],
            startedAt: new Date(now.getTime() + oneHour),
            endedAt: new Date(now.getTime() + 2 * oneHour),
        },
        {
            user: users[1 % users.length],
            classroom: classrooms[1 % classrooms.length],
            startedAt: new Date(now.getTime() + 3 * oneHour),
            endedAt: new Date(now.getTime() + 4 * oneHour),
        },
        {
            user: users[2 % users.length],
            classroom: classrooms[2 % classrooms.length],
            startedAt: new Date(now.getTime() + 5 * oneHour),
            endedAt: new Date(now.getTime() + 6 * oneHour),
        },
    ];

    for (const bookingData of bookingsData) {
        const booking = bookingRepository.create(bookingData);
        await bookingRepository.save(booking);
        console.log(`Booking created for ${booking.user.email} in ${booking.classroom.nameRoom}`);
    }
}
