import { z } from "zod";

export const createRoleSchema = z.object({
	name: z.string().max(50),
});
export const updateRoleSchema = createRoleSchema.partial();
export const roleIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});


// Export all type
export type CreateRoleDto = z.infer<typeof createRoleSchema>;
export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;
export type RoleIdParam = z.infer<typeof roleIdParamSchema>;
