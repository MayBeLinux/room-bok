import request from "supertest";
import { createApp } from "../../src/app";
import { AppDataSource } from "../../src/db/data-source";
import { Building } from "../../src/entity/Building";
import { Classroom } from "../../src/entity/Classroom";
import { Floor } from "../../src/entity/Floor";
import { Role } from "../../src/entity/Role";
import { User } from "../../src/entity/User";
import { closeTestDb, resetTestDb } from "../helpers/db";

const app = createApp();

beforeAll(async () => {
	await resetTestDb();
});

beforeEach(async () => {
	await resetTestDb();
});

afterAll(async () => {
	await closeTestDb();
});

const seedUserAndRoom = async (): Promise<{ userId: number; classroomId: number }> => {
	const roleRepo = AppDataSource.getRepository(Role);
	const userRepo = AppDataSource.getRepository(User);
	const buildingRepo = AppDataSource.getRepository(Building);
	const floorRepo = AppDataSource.getRepository(Floor);
	const classroomRepo = AppDataSource.getRepository(Classroom);

	const role = await roleRepo.save(roleRepo.create({ name: "Student" }));
	const user = await userRepo.save(
		userRepo.create({
			firstName: "Test",
			lastName: "User",
			email: "test@example.com",
			password: "hashed",
			role,
		}),
	);
	const building = await buildingRepo.save(buildingRepo.create({ name: "Main" }));
	const floor = await floorRepo.save(floorRepo.create({ level: 1, building }));
	const classroom = await classroomRepo.save(
		classroomRepo.create({ nameRoom: "A101", floor }),
	);

	return { userId: user.id, classroomId: classroom.id };
};

describe("Bookings endpoints", () => {
	it("creates a booking", async () => {
		const { userId, classroomId } = await seedUserAndRoom();
		const response = await request(app).post("/api/bookings").send({
			user_id: userId,
			classroom_id: classroomId,
			started_at: "2026-06-22T09:00:00.000Z",
			ended_at: "2026-06-22T10:00:00.000Z",
		});

		expect(response.status).toBe(201);
		expect(typeof response.body.id).toBe("number");
	});

	it("returns 400 when ended_at is before started_at", async () => {
		const { userId, classroomId } = await seedUserAndRoom();
		const response = await request(app).post("/api/bookings").send({
			user_id: userId,
			classroom_id: classroomId,
			started_at: "2026-06-22T10:00:00.000Z",
			ended_at: "2026-06-22T09:00:00.000Z",
		});

		expect(response.status).toBe(400);
	});

	it("lists bookings", async () => {
		const { userId, classroomId } = await seedUserAndRoom();
		await request(app).post("/api/bookings").send({
			user_id: userId,
			classroom_id: classroomId,
			started_at: "2026-06-22T09:00:00.000Z",
			ended_at: "2026-06-22T10:00:00.000Z",
		});

		const list = await request(app).get("/api/bookings");
		expect(list.status).toBe(200);
		expect(list.body).toHaveLength(1);
	});

	it("returns 404 when fetching an unknown booking", async () => {
		const response = await request(app).get("/api/bookings/9999");
		expect(response.status).toBe(404);
	});
});
