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

    return NextResponse.json({
      accessToken,
      user: {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
