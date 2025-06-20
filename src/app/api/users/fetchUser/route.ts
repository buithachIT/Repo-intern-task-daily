import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt/auth';
import { invalidToken, unauthorized } from '@/helper/apiRes';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');
  if (!accessToken) {
    return unauthorized({ error: 'Unauthorized' });
  }
  const token = accessToken.value;
  const decoded = verifyJwt(token);

  if (!decoded) {
    return invalidToken({ error: 'Invalid token' });
  }
  // Token hợp lệ → trả về thông tin user
  return NextResponse.json({
    user: decoded,
  });
}
