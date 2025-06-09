import { NextResponse } from 'next/server';
import { signJwt, signRefreshToken } from '@/lib/jwt/auth';

const FAKE_USER = {
  id: '1',
  firstName: 'Thạch',
  lastName: 'Bùi',
  email: 'admin@example.com',
  password: '123123123Tt@',
};

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const userPayload = {
    id: FAKE_USER.id,
    email: FAKE_USER.email,
    firstName: FAKE_USER.firstName,
  };

  const accessToken = signJwt(userPayload);
  const refreshToken = signRefreshToken(userPayload);

  const response = NextResponse.json({
    accessToken,
    user: userPayload,
  });

  // Set refresh token in HttpOnly cookie
  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
  });

  return response;
}
