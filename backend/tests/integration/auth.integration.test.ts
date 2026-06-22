import request from "supertest";
import { createApp } from "../../src/app";
import { AppDataSource } from "../../src/db/data-source";
import { Role } from "../../src/entity/Role";
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

const seedRole = async (name: string): Promise<Role> => {
	const repo = AppDataSource.getRepository(Role);
	return repo.save(repo.create({ name }));
};

describe("POST /api/auth/register", () => {
	it("creates a user and returns a JWT", async () => {
		const role = await seedRole("Student");

		const response = await request(app).post("/api/auth/register").send({
			first_name: "Ada",
			last_name: "Lovelace",
			email: "ada@example.com",
			password: "longenoughpassword",
			role_id: role.id,
		});

		expect(response.status).toBe(201);
		expect(typeof response.body.token).toBe("string");
		expect(response.body.user).toMatchObject({
			email: "ada@example.com",
			firstName: "Ada",
			lastName: "Lovelace",
		});
		expect(response.body.user.password).toBeUndefined();
	});

	it("returns 409 when the email is already in use", async () => {
		const role = await seedRole("Student");
		const payload = {
			email: "dup@example.com",
			password: "longenoughpassword",
			role_id: role.id,
		};

		await request(app).post("/api/auth/register").send(payload);
		const response = await request(app).post("/api/auth/register").send(payload);

		expect(response.status).toBe(409);
	});

	it("returns 400 when the password is too short", async () => {
		const role = await seedRole("Student");
		const response = await request(app).post("/api/auth/register").send({
			email: "short@example.com",
			password: "short",
			role_id: role.id,
		});

		expect(response.status).toBe(400);
	});
});

describe("POST /api/auth/login", () => {
	it("returns a JWT for valid credentials", async () => {
		const role = await seedRole("Student");
		await request(app).post("/api/auth/register").send({
			email: "login@example.com",
			password: "longenoughpassword",
			role_id: role.id,
		});

		const response = await request(app).post("/api/auth/login").send({
			email: "login@example.com",
			password: "longenoughpassword",
		});

		expect(response.status).toBe(200);
		expect(typeof response.body.token).toBe("string");
		expect(response.body.user.email).toBe("login@example.com");
	});

	it("returns 401 for a wrong password", async () => {
		const role = await seedRole("Student");
		await request(app).post("/api/auth/register").send({
			email: "wrong@example.com",
			password: "longenoughpassword",
			role_id: role.id,
		});

		const response = await request(app).post("/api/auth/login").send({
			email: "wrong@example.com",
			password: "incorrectpassword",
		});

		expect(response.status).toBe(401);
	});

	it("returns 401 for an unknown email", async () => {
		const response = await request(app).post("/api/auth/login").send({
			email: "nobody@example.com",
			password: "longenoughpassword",
		});

		expect(response.status).toBe(401);
	});
});
