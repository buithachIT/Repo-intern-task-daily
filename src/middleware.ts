import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Chỉ các trang *page* public (không phải API) mới lọt vào đây
const publicPages = ['/about-us', '/home'];

// Các route API thì matcher đã bao phủ, không cần liệt kê ở đây

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('refreshToken')?.value;

  // 1. Nếu đã login (có token) mà đi vào /login hoặc /register → chuyển về /home
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // 2. Nếu chưa login mà truy cập page public (ví dụ /home, /about-us) → cho tiếp
  if (publicPages.some(page => pathname === page)) {
    return NextResponse.next();
  }

  // 3. Nếu đang gọi API signin/signup thì cho tiếp
  if (
    pathname.startsWith('/api/users/signin') ||
    pathname.startsWith('/api/users/signup')
  ) {
    return NextResponse.next();
  }

  // 4. Các route còn lại đều là protected → nếu không có token thì ép về login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 5. Ngược lại, có token thì cho tiếp
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Áp dụng cho mọi đường dẫn trừ static, images, favicon, public folder
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
