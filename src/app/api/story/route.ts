export const runtime = 'edge';

import { type NextRequest } from 'next/server';
import { IStory } from '@/types/model';
import { getPrisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const prisma = await getPrisma();
  const user = await getUser();
  console.log(222, user);

  const searchParams = request.nextUrl.searchParams;
  const skip = Number(searchParams.get('skip')) || 0;
  let take = Number(searchParams.get('take')) || 10;
  take = Math.min(take, 100);

  const [data, total] = await Promise.all([
    prisma.story.findMany({
      where: {
        deletedAt: {
          equals: null,
        },
      },
      skip,
      take,
      orderBy: { updatedAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            tagValues: {
              select: {
                lang: true,
                name: true,
              },
            },
          },
        },
      },
      omit: {
        originUrl: true,
        deletedAt: true,
      },
    }),
    prisma.story.count({
      where: {
        deletedAt: {
          equals: null,
        },
      },
    }),
  ]);

  return Response.json({ total, data });
}

export async function POST(request: NextRequest) {
  try {
    const prisma = await getPrisma();

    const body = (await request.json()) as IStory & { tagIds: string[] };

    const created = await prisma.story.create({
      data: {
        name: body.name,
        description: body.description,
        authorId: body.authorId,
        lang: body.lang,
        originUrl: body.originUrl as string,
        mature: body.mature,
        cover: body.cover,
        size: body.size,
        finished: body.finished,
        tags: {
          connect: body.tagIds?.map((id: string) => ({ id })) ?? [],
        },
      },
    });

    return Response.json(created);
  } catch (e) {
    return Response.json({ msg: String(e) }, { status: 500 });
  }
}
