import {
	createUserSchema,
	updateUserSchema,
	userIdParamSchema,
	toUserResponse,
} from "../../src/dto/UserDto";
import type { User } from "../../src/entity/User";

describe("UserDto", () => {
	const valid = {
		first_name: "Grace",
		last_name: "Hopper",
		email: "grace@example.com",
		password: "longenoughpassword",
		role_id: 1,
	};

	it("accepts a complete valid payload", () => {
		expect(createUserSchema.safeParse(valid).success).toBe(true);
	});

	it("rejects an invalid email", () => {
		expect(
			createUserSchema.safeParse({ ...valid, email: "nope" }).success,
		).toBe(false);
	});

	it("rejects a password shorter than 8 characters", () => {
		expect(
			createUserSchema.safeParse({ ...valid, password: "short" }).success,
		).toBe(false);
	});

	it("update schema accepts an empty patch", () => {
		expect(updateUserSchema.safeParse({}).success).toBe(true);
	});

	it("coerces id param", () => {
		const result = userIdParamSchema.safeParse({ id: "5" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.id).toBe(5);
	});

	describe("toUserResponse", () => {
		it("strips the password and maps to the response shape", () => {
			const user = {
				id: 1,
				firstName: "Grace",
				lastName: "Hopper",
				email: "grace@example.com",
				password: "should-not-leak",
				role: { id: 2, name: "Admin" },
				bookings: [],
			} as unknown as User;

			const response = toUserResponse(user);
			expect(response).toEqual({
				id: 1,
				firstName: "Grace",
				lastName: "Hopper",
				email: "grace@example.com",
				role: { id: 2, name: "Admin" },
			});
			expect((response as Record<string, unknown>).password).toBeUndefined();
		});
	});
});
