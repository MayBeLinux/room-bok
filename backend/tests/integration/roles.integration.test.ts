import request from "supertest";
import { createApp } from "../../src/app";
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

describe("Roles endpoints", () => {
	it("creates a role", async () => {
		const response = await request(app)
			.post("/api/roles")
			.send({ name: "Teacher" });
		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({ name: "Teacher" });
	});

	it("lists roles", async () => {
		await request(app).post("/api/roles").send({ name: "Admin" });
		const list = await request(app).get("/api/roles");
		expect(list.status).toBe(200);
		expect(list.body).toHaveLength(1);
	});

	it("returns 400 when name is missing", async () => {
		const response = await request(app).post("/api/roles").send({});
		expect(response.status).toBe(400);
	});

	it("returns 404 for an unknown role id", async () => {
		const response = await request(app).get("/api/roles/9999");
		expect(response.status).toBe(404);
	});
});
