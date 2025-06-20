import prisma from '@/lib/connectDB/prisma';
import { badRequest, ok, serverError } from '@/helper/apiRes';
import { PostWithUser } from '@/types/post';
import { NextRequest } from 'next/server';
export async function GET() {
  try {
    const posts: PostWithUser[] = await prisma.post.findMany({
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    return ok({ posts }, 200);
  } catch (error) {
    return serverError({ message: 'Internal Server Error', error });
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, userId } = body;

    if (!title || !content || !userId) {
      return badRequest({ message: 'Missing required fields' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return ok({ message: 'Post created successfully', post }, 201);
  } catch (error) {
    return serverError({ message: 'Internal Server Error', error });
  }
}