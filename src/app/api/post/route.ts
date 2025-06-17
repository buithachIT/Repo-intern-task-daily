import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/connectDB/prisma'
import { ok } from '@/helper/apiRes'
export async function GET(req: NextRequest) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: { firstName: true, lastName: true, email: true }
                },
                _count: {
                    select: { reviews: true }
                }
            }
        })

        return ok({ posts }, 200);
    } catch (error) {
        console.error('Get posts error:', error)
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
