import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email("Required"),
    name: z.string().trim().min(1, "Required").max(16, "At most 16 characters are allowed"),
    password: z.string().trim().min(6, "At least 6 characters are required").max(64, "At most 64 characters are allowed"),
});

export const loginSchema = z.object({
    email: z.string().email("Required"),
    password: z.string().min(1, "Required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;