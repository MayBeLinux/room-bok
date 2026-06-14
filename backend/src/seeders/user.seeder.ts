// This file test create a seeder data to test the db 

import { AppDataSource } from "../db/data-source";
import { User } from "../entity/User";

export async function seedUsers() {
    const userRepository = AppDataSource.getRepository(User);

    const usersData = [
        {first_name: 'Antoine', last_name: 'Parsing', email: 'antoine@test.com', password: 'password'},
        {first_name: 'John', last_name: 'Doe', email: 'john.doe@test.com', password: 'password'},
        {first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@test.com', password: 'password'},
        {first_name: 'Christophe', last_name: 'Litup', email: 'christophe@test.com', password: 'password'},
    ]
    for (const userData of usersData) {
        const user = userRepository.create(userData)
        await userRepository.save(user)
        console.log("User create", user)
    }
}