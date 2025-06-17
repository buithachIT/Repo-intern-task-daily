import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, signJwt } from '@/lib/jwt/auth';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
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
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 5 * 60, // 5 phút, giữ nguyên thời hạn như trong signin/route.ts
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
