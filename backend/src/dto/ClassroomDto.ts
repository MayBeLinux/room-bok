import { z } from "zod";

export const createClassroomSchema = z.object({
	name_room: z.string().max(100),
	floor_id: z.number().int().positive(),
	maintenance: z.boolean().optional(),
});
export const updateClassroomSchema = createClassroomSchema.partial();
export const classroomIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});


// Export all type
export type CreateClassroomDto = z.infer<typeof createClassroomSchema>;
export type UpdateClassroomDto = z.infer<typeof updateClassroomSchema>;
export type ClassroomIdParam = z.infer<typeof classroomIdParamSchema>;
