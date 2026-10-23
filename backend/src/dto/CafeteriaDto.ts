import { z } from "zod";

export const cafeteriaIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});


// Export all type
export type CafeteriaIdParam = z.infer<typeof cafeteriaIdParamSchema>;
