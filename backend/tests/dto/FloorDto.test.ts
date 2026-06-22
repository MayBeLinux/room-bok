import {
	createFloorSchema,
	updateFloorSchema,
	floorIdParamSchema,
} from "../../src/dto/FloorDto";

describe("FloorDto", () => {
	it("accepts a valid floor", () => {
		expect(
			createFloorSchema.safeParse({ level: 0, building_id: 1 }).success,
		).toBe(true);
	});

	it("accepts negative floor levels (basement)", () => {
		expect(
			createFloorSchema.safeParse({ level: -1, building_id: 1 }).success,
		).toBe(true);
	});

	it("rejects a non-integer level", () => {
		expect(
			createFloorSchema.safeParse({ level: 1.5, building_id: 1 }).success,
		).toBe(false);
	});

	it("rejects a non-positive building_id", () => {
		expect(
			createFloorSchema.safeParse({ level: 1, building_id: 0 }).success,
		).toBe(false);
	});

	it("update schema accepts an empty patch", () => {
		expect(updateFloorSchema.safeParse({}).success).toBe(true);
	});

	it("coerces id param", () => {
		const result = floorIdParamSchema.safeParse({ id: "7" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.id).toBe(7);
	});
});
