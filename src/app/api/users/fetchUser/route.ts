import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt/auth';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = accessToken.value;
  const decoded = verifyJwt(token);

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  // Token hợp lệ → trả về thông tin user
  return NextResponse.json({
    user: decoded,
  });
}
