import {
	createBuildingSchema,
	updateBuildingSchema,
	buildingIdParamSchema,
} from "../../src/dto/BuildingDto";

describe("BuildingDto", () => {
	it("accepts a valid name", () => {
		expect(createBuildingSchema.safeParse({ name: "Main" }).success).toBe(true);
	});

	it("rejects a name longer than 100 characters", () => {
		expect(
			createBuildingSchema.safeParse({ name: "x".repeat(101) }).success,
		).toBe(false);
	});

	it("rejects a missing name", () => {
		expect(createBuildingSchema.safeParse({}).success).toBe(false);
	});

	it("makes name optional on update", () => {
		expect(updateBuildingSchema.safeParse({}).success).toBe(true);
		expect(updateBuildingSchema.safeParse({ name: "Annex" }).success).toBe(
			true,
		);
	});

	it("coerces id param to number", () => {
		const result = buildingIdParamSchema.safeParse({ id: "3" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.id).toBe(3);
	});
});
