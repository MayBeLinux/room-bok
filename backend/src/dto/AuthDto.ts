import { z } from "zod";

export const registerSchema = z.object({
	first_name: z.string().max(100).optional(),
	last_name: z.string().max(100).optional(),
	email: z.string().email().max(255),
	password: z.string().min(8).max(255),
	role_id: z.number().int().positive(),
});
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});


// Export all type
export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
