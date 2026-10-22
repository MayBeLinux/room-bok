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

    // Default accounts to test the login, one per role (documented in the README).
    const testAccounts = [
        { firstName: "Admin", lastName: "Test", email: "admin@roombook.test", password: "Admin1234!", role: adminRole },
        { firstName: "Teacher", lastName: "Test", email: "teacher@roombook.test", password: "Teacher1234!", role: teacherRole },
        { firstName: "Student", lastName: "Test", email: "student@roombook.test", password: "Student1234!", role: studentRole },
    ];

    const usersData = [
        ...(await Promise.all(
            testAccounts.map(async (account) => ({ ...account, password: await bcrypt.hash(account.password, 10) })),
        )),
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

    console.log("Login test accounts:");
    for (const account of testAccounts) {
        console.log(`  ${account.role?.name}: ${account.email} / ${account.password}`);
    }
}
