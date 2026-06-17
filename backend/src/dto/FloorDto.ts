import { z } from "zod";

export const createFloorSchema = z.object({
	level: z.number().int(),
	building_id: z.number().int().positive(),
});
export const updateFloorSchema = createFloorSchema.partial();
export const floorIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});


// Export all type
export type CreateFloorDto = z.infer<typeof createFloorSchema>;
export type UpdateFloorDto = z.infer<typeof updateFloorSchema>;
export type FloorIdParam = z.infer<typeof floorIdParamSchema>;
