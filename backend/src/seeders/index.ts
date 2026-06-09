import { DataSource } from "typeorm";
import { AppDataSource } from "../db/data-source";

function runSeeders(dataSource: DataSource) {
    try {
        console.log("Starting seeders ...");
        AppDataSource.initialize()
    } catch (error) {
        console.error("Error during seeding:", error);
    } finally {
        AppDataSource.destroy();
    }
}