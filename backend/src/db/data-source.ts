import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    ssl: process.env.DB_HOST === "localhost" ? false : { rejectUnauthorized: false },
    synchronize: false,
    logging: true,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})


try {
    AppDataSource.initialize()
    console.log("Data Source has been initialized")
} catch (err) {
    console.error("Error during Data Source initialization:", err)
}