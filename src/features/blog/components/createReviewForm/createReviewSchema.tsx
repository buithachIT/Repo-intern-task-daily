import * as z from 'zod';

export const createReviewSchema = z.object({
    content: z
        .string({
            required_error: 'Required field',
        })
        .min(1, { message: 'Required field' }),
    rating: z
        .number({
            required_error: 'Rating is required',
            invalid_type_error: 'Rating must be a number',
        })
        .min(1, { message: 'Rating must be at least 1' })
        .max(5, { message: 'Rating cannot be more than 5' }),
});
export type createReviewFormValues = z.infer<typeof createReviewSchema>;
