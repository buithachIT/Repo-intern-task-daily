import { signinFormSchema } from '@/features/auth/components/SigninForm/SigninSchema';
import { badRequest, ok, serverError, unauthorized } from '@/helper/apiRes';
import { signJwt, signRefreshToken } from '@/lib/jwt/auth';
import prisma from '@/lib/connectDB/prisma';
import bcrypt from 'bcryptjs';
import { STORAGE_KEY } from '@/config/storageKeys';
import { EXPIRED_TOKEN } from '@/config/expired_jwt';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parse = signinFormSchema.safeParse(body);
    if (!parse.success) {
      const errors = parse.error.flatten().fieldErrors;
      return badRequest({
        code: 'VALIDATION_ERROR',
        message: 'Invalid signin data',
        details: errors,
      });
    }
    const { email, password } = parse.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return unauthorized({
        code: 'INVALID_CREDENTIALS',
        message: 'Email or password is incorrect',
      });
    }

    //Xử lý hashpass tại đây
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return unauthorized({
        code: 'INVALID_CREDENTIALS',
        message: 'Email or password is incorrect',
      });
    }
    const userPayload = {
      id: user.id,
      firstName: user.firstName || undefined,
      email: user.email,
    };

    const accessToken = signJwt(userPayload);
    const refreshToken = signRefreshToken(userPayload);

    const response = ok(
      {
        user: userPayload,
      },
      200
    );

    response.cookies.set({
      name: STORAGE_KEY.REFRESH_TOKEN,
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: EXPIRED_TOKEN.EXPIRED_REFRESH_TOKEN, // 7 ngày
    });
    response.cookies.set({
      name: STORAGE_KEY.TOKEN,
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: EXPIRED_TOKEN.EXPIRED_ACCESS_TOKEN,
    });

    return response;
  } catch (err) {
    return serverError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could not process sign in request',
      err,
    });
  }
}
