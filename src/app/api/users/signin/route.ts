import { ok, serverError, unauthorized } from '@/helper/apiRes';
import { signJwt, signRefreshToken } from '@/lib/jwt/auth';



const FAKE_USER = {
  id: '1',
  firstName: 'Thạch',
  lastName: 'Bùi',
  email: 'admin@example.com',
  password: '123123123Tt@',
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
      return unauthorized({
        code: 'INVALID_CREDENTIALS',
        message: 'Email or password is incorrect',
      });
    }

    const userPayload = {
      id: FAKE_USER.id,
      firstName: FAKE_USER.firstName,
      email: FAKE_USER.email,
    };

    const accessToken = signJwt(userPayload);
    const refreshToken = signRefreshToken(userPayload);

    const response = ok(
      {
        user: userPayload,
        accessToken,
      },
      200
    );
    response.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
    });

    return response;
  } catch (err) {
    console.error('Signin error:', err);
    return serverError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could not process sign in request',
    });
  }
}
