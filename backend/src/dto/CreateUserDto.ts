import { z } from "zod";

export const createUserSchema = z.object({
	first_name: z.string().max(100).optional(),
	last_name: z.string().max(100).optional(),
	email: z.string().email().max(255),
	password: z.string().min(8).max(255),
	role_id: z.number().int().positive(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
