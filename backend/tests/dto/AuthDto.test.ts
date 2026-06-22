import { registerSchema, loginSchema } from "../../src/dto/AuthDto";

describe("AuthDto", () => {
	describe("registerSchema", () => {
		const validPayload = {
			first_name: "Ada",
			last_name: "Lovelace",
			email: "ada@example.com",
			password: "longenoughpassword",
			role_id: 1,
		};

		it("accepts a complete valid payload", () => {
			expect(registerSchema.safeParse(validPayload).success).toBe(true);
		});

		it("accepts the payload without optional names", () => {
			const { first_name, last_name, ...rest } = validPayload;
			expect(registerSchema.safeParse(rest).success).toBe(true);
		});

		it("rejects an invalid email", () => {
			const result = registerSchema.safeParse({
				...validPayload,
				email: "not-an-email",
			});
			expect(result.success).toBe(false);
		});

		it("rejects a password shorter than 8 characters", () => {
			const result = registerSchema.safeParse({
				...validPayload,
				password: "short",
			});
			expect(result.success).toBe(false);
		});

		it("rejects a non-positive role_id", () => {
			const result = registerSchema.safeParse({ ...validPayload, role_id: 0 });
			expect(result.success).toBe(false);
		});

		it("rejects a non-integer role_id", () => {
			const result = registerSchema.safeParse({
				...validPayload,
				role_id: 1.5,
			});
			expect(result.success).toBe(false);
		});
	});

	describe("loginSchema", () => {
		it("accepts a valid email + password", () => {
			expect(
				loginSchema.safeParse({ email: "a@b.co", password: "x" }).success,
			).toBe(true);
		});

		it("rejects an empty password", () => {
			expect(
				loginSchema.safeParse({ email: "a@b.co", password: "" }).success,
			).toBe(false);
		});

		it("rejects a missing email", () => {
			expect(loginSchema.safeParse({ password: "x" }).success).toBe(false);
		});
	});
});
