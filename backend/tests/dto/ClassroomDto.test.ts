import {
	createClassroomSchema,
	updateClassroomSchema,
	classroomIdParamSchema,
} from "../../src/dto/ClassroomDto";

describe("ClassroomDto", () => {
	it("accepts a valid classroom payload", () => {
		expect(
			createClassroomSchema.safeParse({ name_room: "A101", floor_id: 1 })
				.success,
		).toBe(true);
	});

	it("accepts the optional maintenance flag", () => {
		const result = createClassroomSchema.safeParse({
			name_room: "A101",
			floor_id: 1,
			maintenance: true,
		});
		expect(result.success).toBe(true);
	});

	it("rejects an empty name_room when it exceeds 100 chars", () => {
		const result = createClassroomSchema.safeParse({
			name_room: "x".repeat(101),
			floor_id: 1,
		});
		expect(result.success).toBe(false);
	});

	it("rejects a non-positive floor_id", () => {
		expect(
			createClassroomSchema.safeParse({ name_room: "A101", floor_id: 0 })
				.success,
		).toBe(false);
	});

	it("makes every field optional on update", () => {
		expect(updateClassroomSchema.safeParse({}).success).toBe(true);
	});

	it("coerces id param", () => {
		const result = classroomIdParamSchema.safeParse({ id: "9" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.id).toBe(9);
	});
});
