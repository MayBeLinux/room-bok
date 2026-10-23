import { cafeteriaIdParamSchema } from "../../src/dto/CafeteriaDto";

describe("CafeteriaDto", () => {
	it("coerces id param to number", () => {
		const result = cafeteriaIdParamSchema.safeParse({ id: "3" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.id).toBe(3);
	});

	it("rejects a non-positive id", () => {
		expect(cafeteriaIdParamSchema.safeParse({ id: "0" }).success).toBe(false);
	});

	it("rejects a non-numeric id", () => {
		expect(cafeteriaIdParamSchema.safeParse({ id: "abc" }).success).toBe(false);
	});
});
