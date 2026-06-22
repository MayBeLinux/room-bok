import {
	createRoleSchema,
	updateRoleSchema,
	roleIdParamSchema,
} from "../../src/dto/RoleDto";

describe("RoleDto", () => {
	it("accepts a short role name", () => {
		expect(createRoleSchema.safeParse({ name: "Admin" }).success).toBe(true);
	});

	it("rejects a name longer than 50 characters", () => {
		expect(
			createRoleSchema.safeParse({ name: "x".repeat(51) }).success,
		).toBe(false);
	});

	it("update schema accepts an empty patch", () => {
		expect(updateRoleSchema.safeParse({}).success).toBe(true);
	});

	it("coerces id param", () => {
		const result = roleIdParamSchema.safeParse({ id: "1" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.id).toBe(1);
	});
});
