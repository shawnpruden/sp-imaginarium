import prisma from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export const fetchPosts = async () => {
  noStore();

  try {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: { include: { user: true } },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
