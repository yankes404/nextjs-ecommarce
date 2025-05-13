import { z } from "zod";

const slugSchema = z
  .string()
  .min(1, "Required")
  .max(32, "At must 32 characters are allowed")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");

export const productSchema = z.object({
    name: z.string().trim().min(1, "Required").max(32, "At most 32 characters are allowed"),
    slug: slugSchema,
    stripeId: z.string().trim().min(1, "Required"),
    description: z.string().trim().min(1, "Required").max(256, "At most 256 characters are allowed"),
    price: z.number().min(1, "Required").max(Number.MAX_SAFE_INTEGER, "Required"),
    categoryId: z.string().trim().min(1, "Required")
});

export const productCategorySchema = z.object({
    name: z.string().trim().min(1, "Required").max(32, "At most 32 characters are allowed"),
    slug: slugSchema
});

export const feedbackSchema = z.object({
    stars: z.number().min(1, "Required").max(5, "Required"),
    content: z.string().trim().min(1, "Required").max(256, "At most 256 characters are allowed")
});

export type ProductSchema = z.infer<typeof productSchema>;
export type ProductCategorySchema = z.infer<typeof productCategorySchema>;
export type FeedbackSchema = z.infer<typeof feedbackSchema>;