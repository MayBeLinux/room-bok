import { AppDataSource } from "../db/data-source";
import { seedRoles } from "./role.seeder";
import { seedUsers } from "./user.seeder";
import { seedBuildings } from "./building.seeder";
import { seedClassrooms } from "./classroom.seeder";
import { seedEquipments } from "./equipment.seeder";
import { seedBookings } from "./booking.seeder";

async function runSeeders() {
    try {
        console.log("Starting seeders...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        await seedRoles();
        await seedUsers();
        await seedBuildings();
        await seedClassrooms();
        await seedEquipments();
        await seedBookings();

        console.log("Seeders finished.");
    } catch (error) {
        console.error("Error during seeding:", error);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

runSeeders();
