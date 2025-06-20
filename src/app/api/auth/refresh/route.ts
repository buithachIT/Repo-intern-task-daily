import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, signJwt } from '@/lib/jwt/auth';
import { STORAGE_KEY } from '@/config/storageKeys';
import { EXPIRED_TOKEN } from '@/config/expired_jwt';
import { badRequest, invalidToken } from '@/helper/apiRes';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(STORAGE_KEY.REFRESH_TOKEN)?.value;

    if (!refreshToken) {
      return badRequest({ error: 'Refresh token is required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return invalidToken({ error: 'Invalid refresh token' });
    }

    // Tạo access token mới
    const accessToken = signJwt({
      id: decoded.id,
      email: decoded.email,
      firstName: decoded.firstName,
    });

    const response = NextResponse.json({
      accessToken,
      user: {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
      },
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
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
