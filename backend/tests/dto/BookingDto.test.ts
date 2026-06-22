import {
	createBookingSchema,
	updateBookingSchema,
	bookingIdParamSchema,
} from "../../src/dto/BookingDto";

describe("BookingDto", () => {
	describe("createBookingSchema", () => {
		const base = {
			user_id: 1,
			classroom_id: 2,
			started_at: "2026-06-22T09:00:00.000Z",
			ended_at: "2026-06-22T10:00:00.000Z",
		};

		it("accepts a valid booking and coerces dates", () => {
			const result = createBookingSchema.safeParse(base);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.started_at).toBeInstanceOf(Date);
				expect(result.data.ended_at).toBeInstanceOf(Date);
			}
		});

		it("rejects when ended_at is before started_at", () => {
			const result = createBookingSchema.safeParse({
				...base,
				ended_at: "2026-06-22T08:00:00.000Z",
			});
			expect(result.success).toBe(false);
		});

		it("rejects when ended_at equals started_at", () => {
			const result = createBookingSchema.safeParse({
				...base,
				ended_at: base.started_at,
			});
			expect(result.success).toBe(false);
		});

		it("rejects a non-positive user_id", () => {
			expect(
				createBookingSchema.safeParse({ ...base, user_id: 0 }).success,
			).toBe(false);
		});
	});

	describe("updateBookingSchema", () => {
		it("accepts an empty patch", () => {
			expect(updateBookingSchema.safeParse({}).success).toBe(true);
		});

		it("accepts a partial patch", () => {
			expect(
				updateBookingSchema.safeParse({ classroom_id: 7 }).success,
			).toBe(true);
		});
	});

	describe("bookingIdParamSchema", () => {
		it("coerces string ids to numbers", () => {
			const result = bookingIdParamSchema.safeParse({ id: "42" });
			expect(result.success).toBe(true);
			if (result.success) expect(result.data.id).toBe(42);
		});

		it("rejects non-numeric ids", () => {
			expect(bookingIdParamSchema.safeParse({ id: "abc" }).success).toBe(false);
		});
	});
});
