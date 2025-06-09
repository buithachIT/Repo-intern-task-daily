import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accept,
        } = body;

        // Validate đơn giản
        if (!accept) {
            return NextResponse.json({ error: 'Please accept the terms' }, { status: 400 });
        }

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
        }

        // Mô phỏng đăng ký thành công
        return NextResponse.json({
            message: 'User registered successfully',
            user: {
                id: 'mock-id-123',
                firstName,
                lastName,
                email,
            },
        }, { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
