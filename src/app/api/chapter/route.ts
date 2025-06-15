export const runtime = 'edge';

import { type NextRequest } from 'next/server';
import { IChapter } from '@/types/model';
import { getPrisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const storyId = searchParams.get('storyId') as string;
  const skip = Number(searchParams.get('skip')) || 0;
  let take = Number(searchParams.get('take')) || 10;
  take = Math.min(take, 100);

  const prisma = await getPrisma();
  const chapters = await prisma.chapter.findMany({
    where: { storyId, deletedAt: null },
    orderBy: { index: 'asc' },
    select: {
      id: true,
      index: true,
      viewCount: true,
      name: true,
      createdAt: true,
    },
    skip,
    take,
  });
  return Response.json(chapters);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      storyId: string;
      chapters: IChapter[];
    };
    const prisma = await getPrisma();

    const { storyId, chapters } = body;
    if (!storyId)
      return Response.json({ msg: 'storyId is missing!' }, { status: 500 });

    if (!chapters || !chapters.length)
      return Response.json({ msg: 'chapters is missing!' }, { status: 500 });

    let start = -1;
    if (typeof chapters[0].index !== 'number') {
      const lastChapter = await prisma.chapter.findFirst({
        where: {
          storyId,
        },
        orderBy: {
          index: 'desc',
        },
        select: {
          index: true,
        },
      });
      start = lastChapter ? lastChapter.index + 1 : 1;
    }

    const createChapterPromises = chapters.map((ch) => {
      const chapterIndex = start !== -1 ? start++ : ch.index;

      const paragraphs = (ch.paragraphs || []).map((p, pIdx) => ({
        index: p.index ?? pIdx + 1,
        type: p.type,
        content: p.content,
      }));

      return prisma.chapter.create({
        data: {
          name: ch.name,
          index: chapterIndex,
          storyId,
          paragraphs: {
            create: paragraphs,
          },
        },
        include: {
          paragraphs: true,
        },
      });
    });

    const createdChapters = await Promise.all(createChapterPromises);

    return Response.json({ success: true, data: createdChapters });
  } catch (e) {
    return Response.json({ msg: String(e) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const prisma = await getPrisma();
  const body: string[] = await request.json();
  const deleted = await prisma.chapter.updateMany({
    where: { id: {
      in: body,
    } },
    data: {
      deletedAt: new Date().toISOString(),
    }
  });
  return Response.json({ deleted });
}
