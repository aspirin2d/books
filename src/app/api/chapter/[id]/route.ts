export const runtime = 'edge';

import { type NextRequest } from 'next/server';
import { IChapter } from '@/types/model';
import { getPrisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const prisma = await getPrisma();
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    select: {
      id: true,
      index: true,
      viewCount: true,
      name: true,
      createdAt: true,
      paragraphs: {
        select: {
          index: true,
          content: true,
          type: true,
        }
      }
    }
  });
  return Response.json(chapter);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = (await request.json()) as IChapter;
    const prisma = await getPrisma();
    const { id } = await params;

    const { paragraphs = [] } = body;

    if (paragraphs?.length) {
      paragraphs.forEach((p, pIdx) => p.index = pIdx + 1);
      await prisma.paragraph.deleteMany({
        where: {
          chapterId: id,
        },
      });
    }

    const chapter = await prisma.chapter.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        index: body.index,
        paragraphs: {
          create: paragraphs,
        },
      },
    });

    return Response.json({ success: true, data: chapter });
  } catch (e) {
    return Response.json({ msg: String(e) }, { status: 500 });
  }
}
