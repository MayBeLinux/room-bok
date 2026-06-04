import { DataSource } from "typeorm/browser/data-source/index.js"
require("dotenv").config()

import { User } from "../entity/User"
import { Booking } from "../entity/Booking"
import { Building } from "../entity/Building"
import { Classroom } from "../entity/Classroom"
import { ClassroomEquipment } from "../entity/ClassroomEquipment"
import { Equipment } from "../entity/Equipment"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Booking, Building, Classroom, ClassroomEquipment, Equipment],
    migrations: [],
    subscribers: [],
})