import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

import { Booking } from "../entity/Booking";
import { Building } from "../entity/Building";
import { Classroom } from "../entity/Classroom";
import { ClassroomEquipment } from "../entity/ClassroomEquipment";
import { Equipment } from "../entity/Equipment";
import { Floor } from "../entity/Floor";
import { Role } from "../entity/Role";
import { User } from "../entity/User";

dotenv.config();

const entities = [
	Booking,
	Building,
	Classroom,
	ClassroomEquipment,
	Equipment,
	Floor,
	Role,
	User,
];

const isTest = process.env.NODE_ENV === "test";

const testOptions: DataSourceOptions = {
	type: "better-sqlite3",
	database: ":memory:",
	dropSchema: true,
	synchronize: true,
	logging: false,
	entities,
};

const postgresOptions: DataSourceOptions = {
	type: "postgres",
	host: String(process.env.DB_HOST),
	port: Number(process.env.DB_PORT),
	username: String(process.env.DB_USERNAME),
	password: String(process.env.DB_PASSWORD),
	database: String(process.env.DB_DATABASE),
	ssl:
		process.env.DB_HOST === "localhost"
			? false
			: { rejectUnauthorized: false },
	synchronize: false,
	logging: true,
	entities,
	migrations: ["src/migration/*.ts"],
	subscribers: [],
};

export const AppDataSource = new DataSource(
	isTest ? testOptions : postgresOptions,
);
