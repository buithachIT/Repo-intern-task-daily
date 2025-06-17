import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/connectDB/prisma'
import { STORAGE_KEY } from '@/config/storageKeys'
import { verifyJwt } from '@/lib/jwt/auth'
import { badRequest, ok, serverError, unauthorized } from '@/helper/apiRes'
import { decode } from 'punycode'
import { getUserIdFromToken } from '@/lib/jwt/decode'

export async function POST(req: NextRequest) {
    try {
        const url = req.nextUrl
        const postId = url.pathname.split('/')[3]

        const { content, rating } = await req.json()

        const token = req.cookies.get(STORAGE_KEY.TOKEN)?.value;
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = getUserIdFromToken(token); // hoặc jwt.verify(token, SECRET_KEY)

        if (!userId) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        if (!content || typeof rating !== 'number') {
            return badRequest(
                { message: 'Invalid data' },
            )
        }

        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        if (!post) {
            return badRequest(
                { message: 'Post not found' },
            )
        }

        const review = await prisma.review.create({
            data: {
                userId,
                content,
                rating,
                postId
            }
        })

        return ok(review, 201)

    } catch (error) {
        console.error('Create review error:', error)
        return serverError(
            { message: 'Internal Server Error' }
        )
    }
}
export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl
        const postId = url.pathname.split('/')[3]

        const reviews = await prisma.review.findMany({
            where: { postId },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' }
        })

        return ok({ reviews })
    } catch (error) {
        console.error('Get review error:', error)
        return serverError({ message: 'Internal Server Error' })
    }
}