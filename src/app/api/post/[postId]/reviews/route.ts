import { NextRequest } from 'next/server';
import prisma from '@/lib/connectDB/prisma';
import { STORAGE_KEY } from '@/config/storageKeys';
import { badRequest, invalidToken, ok, serverError, unauthorized } from '@/helper/apiRes';
import { getUserIdFromToken } from '@/lib/jwt/decode';
export async function POST(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const postId = url.pathname.split('/')[3];

    const { content, rating } = await req.json();

    const token = req.cookies.get(STORAGE_KEY.TOKEN)?.value;
    if (!token) {
      return unauthorized({ message: 'Unauthorized' });
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return invalidToken({ message: 'Invalid token' });
    }

    if (!content || typeof rating !== 'number') {
      return badRequest({ message: 'Invalid data' });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return badRequest({ message: 'Post not found' });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        content,
        rating,
        postId,
      },
    });

    return ok(review, 201);
  } catch (error) {
    return serverError({ message: 'Internal Server Error', error });
  }
}
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const postId = url.pathname.split('/')[3];

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
      orderBy: { createdAt: 'desc' },
    });

    return ok({ reviews });
  } catch (error) {
    return serverError({ message: 'Internal Server Error', error });
  }
}
