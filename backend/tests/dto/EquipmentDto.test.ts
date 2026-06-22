import {
	createEquipmentSchema,
	updateEquipmentSchema,
	equipmentIdParamSchema,
} from "../../src/dto/EquipmentDto";

describe("EquipmentDto", () => {
	it("accepts a non-empty name", () => {
		expect(createEquipmentSchema.safeParse({ name: "Projector" }).success).toBe(
			true,
		);
	});

	it("rejects an empty name", () => {
		expect(createEquipmentSchema.safeParse({ name: "" }).success).toBe(false);
	});

	it("update schema accepts an empty patch", () => {
		expect(updateEquipmentSchema.safeParse({}).success).toBe(true);
	});

	it("coerces id param", () => {
		const result = equipmentIdParamSchema.safeParse({ id: "11" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.id).toBe(11);
	});
});
