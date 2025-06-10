import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các route không cần authentication
const publicRoutes = ['/login', '/register', '/about-us', '/home', '/api/users/signin', '/api/users/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kiểm tra nếu là public route
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Kiểm tra access token
  const token = request.cookies.get('refreshToken')?.value;
  if (!token) {
    // Chuyển hướng về trang login nếu không có token
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
