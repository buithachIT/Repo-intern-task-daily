import { badRequest, ok, serverError } from '@/helper/apiRes';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, confirmPassword, accept } =
      await req.json();

    if (!accept) {
      return badRequest({
        code: 'TERMS_NOT_ACCEPTED',
        message: 'You must accept our terms & conditions',
      });
    }

    if (!firstName || !lastName || !email || !password) {
      return badRequest({
        code: 'MISSING_FIELDS',
        message: 'Some required fields are missing',
        details: { firstName, lastName, email, password },
      });
    }

    if (password !== confirmPassword) {
      return badRequest({
        code: 'PASSWORD_MISMATCH',
        message: 'Passwords do not match',
      });
    }

    const user = {
      id: 'mock-id-123',
      firstName,
      lastName,
      email,
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
