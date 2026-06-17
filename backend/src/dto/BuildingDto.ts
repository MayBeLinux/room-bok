import { z } from "zod";

export const createBuildingSchema = z.object({
	name: z.string().max(100),
});
export const updateBuildingSchema = createBuildingSchema.partial();
export const buildingIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});


// Export all type
export type CreateBuildingDto = z.infer<typeof createBuildingSchema>;
export type UpdateBuildingDto = z.infer<typeof updateBuildingSchema>;
export type BuildingIdParam = z.infer<typeof buildingIdParamSchema>;
