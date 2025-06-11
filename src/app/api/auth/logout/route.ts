import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  // REVIEW: Current authentication mechanism is sending jwt
  response.cookies.set({
    name: 'refreshToken',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  return response;
}
