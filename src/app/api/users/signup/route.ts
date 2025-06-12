import { signupFormSchema } from '@/features/auth/components/SignupForm/SignupSchema';
import { badRequest, ok, serverError } from '@/helper/apiRes';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parse = signupFormSchema.safeParse(body);
    if (!parse.success) {
      const errors = parse.error.flatten().fieldErrors;
      return badRequest({
        code: 'VALIDATION_ERROR',
        message: 'Invalid signup data',
        details: errors,
      });
    }
    const { firstName, lastName, email, password } = parse.data;

    const user = {
      id: 'mock-id-123',
      firstName,
      lastName,
      email,
      password
    };

    return ok({ user }, 201);
  } catch (err) {
    console.error('Signup error:', err);
    return serverError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could not process sign up request',
    });
  }
}
