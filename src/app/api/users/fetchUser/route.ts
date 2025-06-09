import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt/auth';


export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJwt(token);

    if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Token hợp lệ → trả về thông tin user
    return NextResponse.json({
        user: decoded,
    });
}
