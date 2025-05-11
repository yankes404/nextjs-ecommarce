import { z } from "zod";

export const productCategorySchema = z.object({
    name: z.string().trim().min(1, "Required").max(32, "At most 32 characters are allowed"),
    slug: z.string().trim().min(1, "Required").max(32, "At most 32 characters are allowed"),
});

export const feedbackSchema = z.object({
    stars: z.number().min(1, "Required").max(5, "Required"),
    content: z.string().trim().min(1, "Required").max(256, "At most 256 characters are allowed")
});

export type ProductCategorySchema = z.infer<typeof productCategorySchema>;
export type FeedbackSchema = z.infer<typeof feedbackSchema>;