import { z } from "zod";

export const createEquipmentSchema = z.object({
	name: z.string().min(1),
});
export const updateEquipmentSchema = createEquipmentSchema.partial();
export const equipmentIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});


// Export all type
export type CreateEquipmentDto = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentDto = z.infer<typeof updateEquipmentSchema>;
export type EquipmentIdParam = z.infer<typeof equipmentIdParamSchema>;
