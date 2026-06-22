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

describe("Buildings endpoints", () => {
	it("returns an empty list when no building exists", async () => {
		const response = await request(app).get("/api/buildings");
		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	it("creates a building and lists it back", async () => {
		const create = await request(app)
			.post("/api/buildings")
			.send({ name: "Main" });
		expect(create.status).toBe(201);
		expect(create.body).toMatchObject({ name: "Main" });
		expect(typeof create.body.id).toBe("number");

		const list = await request(app).get("/api/buildings");
		expect(list.status).toBe(200);
		expect(list.body).toHaveLength(1);
		expect(list.body[0]).toMatchObject({ name: "Main" });
	});

	it("returns 400 when the name is missing on create", async () => {
		const response = await request(app).post("/api/buildings").send({});
		expect(response.status).toBe(400);
	});

	it("returns 404 when fetching an unknown building", async () => {
		const response = await request(app).get("/api/buildings/9999");
		expect(response.status).toBe(404);
	});

	it("updates a building", async () => {
		const created = await request(app)
			.post("/api/buildings")
			.send({ name: "Old" });
		const updated = await request(app)
			.put(`/api/buildings/${created.body.id}`)
			.send({ name: "New" });
		expect(updated.status).toBe(200);
		expect(updated.body.affected).toBe(1);
	});

	it("deletes a building", async () => {
		const created = await request(app)
			.post("/api/buildings")
			.send({ name: "Doomed" });
		const deleted = await request(app).delete(
			`/api/buildings/${created.body.id}`,
		);
		expect(deleted.status).toBe(204);

		const refetch = await request(app).get(`/api/buildings/${created.body.id}`);
		expect(refetch.status).toBe(404);
	});
});
