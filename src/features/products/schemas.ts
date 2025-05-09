import { z } from "zod";

export const feedbackSchema = z.object({
    stars: z.number().min(1, "Required").max(5, "Required"),
    content: z.string().trim().min(1, "Required").max(256, "At most 256 characters are allowed")
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;