import {
	createClassroomEquipmentSchema,
	updateClassroomEquipmentSchema,
	classroomEquipmentParamsSchema,
} from "../../src/dto/ClassroomEquipmentDto";

describe("ClassroomEquipmentDto", () => {
	it("accepts the minimum required link", () => {
		expect(
			createClassroomEquipmentSchema.safeParse({
				id_classroom: 1,
				id_equipment: 2,
			}).success,
		).toBe(true);
	});

	it("accepts optional fields", () => {
		const result = createClassroomEquipmentSchema.safeParse({
			id_classroom: 1,
			id_equipment: 2,
			started_at: "2026-01-01T00:00:00.000Z",
			ended_at: "2026-12-31T00:00:00.000Z",
			quantity: 5,
		});
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.started_at).toBeInstanceOf(Date);
	});

	it("rejects a negative quantity", () => {
		expect(
			createClassroomEquipmentSchema.safeParse({
				id_classroom: 1,
				id_equipment: 2,
				quantity: -1,
			}).success,
		).toBe(false);
	});

	it("update schema accepts a partial patch", () => {
		expect(
			updateClassroomEquipmentSchema.safeParse({ quantity: 3 }).success,
		).toBe(true);
		expect(updateClassroomEquipmentSchema.safeParse({}).success).toBe(true);
	});

	it("coerces both composite id params", () => {
		const result = classroomEquipmentParamsSchema.safeParse({
			idClassroom: "1",
			idEquipment: "2",
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.idClassroom).toBe(1);
			expect(result.data.idEquipment).toBe(2);
		}
	});
});
