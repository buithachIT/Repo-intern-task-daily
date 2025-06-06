
import * as z from 'zod';

export const signupFormSchema = z
    .object({
        firstName: z
            .string({ required_error: "required field" })
            .min(1, { message: "required field" }),
        lastName: z
            .string({ required_error: "required field" })
            .min(1, { message: "required field" }),
        email: z
            .string({
                required_error: "required field",
            })
            .min(1, { message: "required field" })
            .email({
                message: "required field",
            }),
        password: z
            .string({
                required_error: "required field",
            })
            .min(1, { message: "required field" })
            .min(8, { message: "weak password" })
            .max(16, { message: "weak password" })
            .refine((password) => /[A-Z]/.test(password), "weak password")
            .refine((password) => /[a-z]/.test(password), "weak password")
            .refine((password) => /[0-9]/.test(password), "weak password")
            .refine((password) => /[!@#$%^&*]/.test(password), "weak password"),
        confirmPassword: z.string({
            required_error: "required field",
        }),
        accept: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords don’t match. Please try again.',
        path: ['confirmPassword'],
    });

export type SignupFormValues = z.infer<typeof signupFormSchema>;
