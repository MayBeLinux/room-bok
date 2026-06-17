import { z } from "zod";

export const createBookingSchema = z.object({
	user_id: z.number().int().positive(),
	classroom_id: z.number().int().positive(),
	started_at: z.coerce.date(),
	ended_at: z.coerce.date(),
}).refine((data) => data.ended_at > data.started_at, {
	message: "ended_at must be after started_at",
	path: ["ended_at"],
});
export const updateBookingSchema = z.object({
	user_id: z.number().int().positive().optional(),
	classroom_id: z.number().int().positive().optional(),
	started_at: z.coerce.date().optional(),
	ended_at: z.coerce.date().optional(),
});
export const bookingIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});


// Export all type
export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export type UpdateBookingDto = z.infer<typeof updateBookingSchema>;
export type BookingIdParam = z.infer<typeof bookingIdParamSchema>;
