// This file creates initial users to test the DB.

import bcrypt from "bcrypt";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/User";
import { Role } from "../entity/Role";

export async function seedUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);

    const adminRole = await roleRepository.findOneBy({ name: "Administrator" });
    const teacherRole = await roleRepository.findOneBy({ name: "Teacher" });
    const studentRole = await roleRepository.findOneBy({ name: "Student" });

    const hashedPassword = await bcrypt.hash("password", 10);

    const usersData = [
        { firstName: "Alice", lastName: "Martin", email: "alice.martin@example.com", password: hashedPassword, role: adminRole },
        { firstName: "Bob", lastName: "Durand", email: "bob.durand@example.com", password: hashedPassword, role: teacherRole },
        { firstName: "Claire", lastName: "Dupont", email: "claire.dupont@example.com", password: hashedPassword, role: teacherRole },
        { firstName: "David", lastName: "Leroy", email: "david.leroy@example.com", password: hashedPassword, role: studentRole },
    ];

    for (const userData of usersData) {
        const existingUser = await userRepository.findOneBy({ email: userData.email });
        if (existingUser) {
            console.log("User already exists:", existingUser.email);
        } else {
        if (!userData.role) continue;
        const user = userRepository.create({ ...userData, role: userData.role });
        await userRepository.save(user);
        console.log("User created:", user.email);
        }    
    }
}
