import { z } from "zod";

const email = z.string().email("Required"); 

export const emailSchema = z.object({ email });

const password = z.string().trim().min(6, "At least 6 characters are required").max(64, "At most 64 characters are allowed");

export const passwordSchema = z.object({ password });

export const registerSchema = z.object({
    email,
    name: z.string().trim().min(1, "Required").max(16, "At most 16 characters are allowed"),
    password
});

export const loginSchema = z.object({
    email,
    password: z.string().min(1, "Required"),
});

export const settingsSchema = z.object({
    email,
    name: z.string().trim().min(1, "Required").max(16, "At most 16 characters are allowed"),
    password: z.optional(z.string().trim().max(64, "At most 64 characters are allowed").refine((value) => {
        return value.length === 0 || value.length >= 6
    }, "At least 6 characters are required")),
    twoFA: z.boolean({ invalid_type_error: "Required" })
});

export type EmailSchema = z.infer<typeof emailSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type SettingsSchema = z.infer<typeof settingsSchema>;