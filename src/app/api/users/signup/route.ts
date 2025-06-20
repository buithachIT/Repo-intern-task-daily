import { signupFormSchema } from '@/features/auth/components/SignupForm/SignupSchema';
import { badRequest, ok, serverError } from '@/helper/apiRes';
import prisma from '@/lib/connectDB/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    //validate
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

    //Check existing mail
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return badRequest({
        code: 'USER_EXISTS',
        message: 'Email is already registered',
      });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const userPayload = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };

    return ok({ user: userPayload }, 201);
  } catch (err) {
    return serverError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could not process sign up request',
      err,
    });
  }
}
