import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
dotenv.config()

import { User } from "../entity/User"
import { Booking } from "../entity/Booking"
import { Building } from "../entity/Building"
import { Classroom } from "../entity/Classroom"
import { ClassroomEquipment } from "../entity/ClassroomEquipment"
import { Equipment } from "../entity/Equipment"
import { Role } from "../entity/Role"
import { Floor } from "../entity/Floor"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User, Booking, Building, Classroom, ClassroomEquipment, Equipment, Role, Floor],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})