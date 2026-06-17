import { z } from "zod";

export const createClassroomEquipmentSchema = z.object({
	id_classroom: z.number().int().positive(),
	id_equipment: z.number().int().positive(),
	started_at: z.coerce.date().optional(),
	ended_at: z.coerce.date().optional(),
	quantity: z.number().int().nonnegative().optional(),
});
export const updateClassroomEquipmentSchema = z.object({
	started_at: z.coerce.date().optional(),
	ended_at: z.coerce.date().optional(),
	quantity: z.number().int().nonnegative().optional(),
});
export const classroomEquipmentParamsSchema = z.object({
	idClassroom: z.coerce.number().int().positive(),
	idEquipment: z.coerce.number().int().positive(),
});


// Export all type
export type CreateClassroomEquipmentDto = z.infer<typeof createClassroomEquipmentSchema>;
export type UpdateClassroomEquipmentDto = z.infer<typeof updateClassroomEquipmentSchema>;
export type ClassroomEquipmentParams = z.infer<typeof classroomEquipmentParamsSchema>;
