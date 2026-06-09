// This file test create a seeder data to test the db 

import { AppDataSource } from "../db/data-source";
import { User } from "../entity/User";

export async function seedUsers() {
    const userRepository = AppDataSource.getRepository(User);

    const usersData = [
        {first_name: 'Joshua'},
        {last_name: 'Kieffer'},
        {email: 'joshutinel@gmail.com'},
        {password: 'test1234'},
    ]
    for (const userData of usersData) {
        const user = userRepository.create(userData)
        await userRepository.save(user)
        console.log("User create", user)
    }
}