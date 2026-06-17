import { z } from "zod";
import type { User } from "../entity/User";

export const createUserSchema = z.object({
	first_name: z.string().max(100).optional(),
	last_name: z.string().max(100).optional(),
	email: z.string().email().max(255),
	password: z.string().min(8).max(255),
	role_id: z.number().int().positive(),
});
export const updateUserSchema = createUserSchema.partial();
export const userIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const userResponseSchema = z.object({
	id: z.number().int().positive(),
	firstName: z.string().nullable(),
	lastName: z.string().nullable(),
	email: z.string().nullable(),
	role: z.unknown().optional(),
});


// Export all type
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserResponseDto = z.infer<typeof userResponseSchema>;

export const toUserResponse = (user: User): UserResponseDto => ({
	id: user.id,
	firstName: user.firstName,
	lastName: user.lastName,
	email: user.email,
	role: user.role,
});
