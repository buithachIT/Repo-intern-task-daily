import prisma from '@/lib/connectDB/prisma';
import { ok, serverError } from '@/helper/apiRes';
import { PostWithUser } from '@/types/post';
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
