import * as z from 'zod';
export const createPostFormSchema = z.object({
    title: z
        .string({
            required_error: 'Required field',
        })
        .min(1, { message: 'Required field' }),
    content: z
        .string({
            required_error: 'Required field',
        })
        .min(1, { message: 'Required field' }),
});
export type createPostFormValues = z.infer<typeof createPostFormSchema>;
