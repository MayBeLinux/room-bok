import request from "supertest";
import { createApp } from "../../src/app";
import { AppDataSource } from "../../src/db/data-source";
import { Building } from "../../src/entity/Building";
import { Floor } from "../../src/entity/Floor";
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

const seedFloor = async (): Promise<Floor> => {
	const buildingRepo = AppDataSource.getRepository(Building);
	const building = await buildingRepo.save(buildingRepo.create({ name: "Main" }));
	const floorRepo = AppDataSource.getRepository(Floor);
	return floorRepo.save(floorRepo.create({ level: 1, building }));
};

describe("Rooms endpoints", () => {
	it("creates a room and lists it back", async () => {
		const floor = await seedFloor();
		const create = await request(app).post("/api/rooms").send({
			name_room: "A101",
			floor_id: floor.id,
			maintenance: false,
		});
		expect(create.status).toBe(201);
		expect(create.body).toMatchObject({ nameRoom: "A101", maintenance: false });

		const list = await request(app).get("/api/rooms");
		expect(list.status).toBe(200);
		expect(list.body).toHaveLength(1);
	});

	it("returns 400 when name_room is missing", async () => {
		const floor = await seedFloor();
		const response = await request(app)
			.post("/api/rooms")
			.send({ floor_id: floor.id });
		expect(response.status).toBe(400);
	});

	it("returns 404 for an unknown room", async () => {
		const response = await request(app).get("/api/rooms/9999");
		expect(response.status).toBe(404);
	});
});
