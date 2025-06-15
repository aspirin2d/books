export const runtime = 'edge';

import { type NextRequest } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const prisma = await getPrisma();
  const searchParams = request.nextUrl.searchParams;

  const storyId = searchParams.get('storyId');
  const chapterId = searchParams.get('chapterId');
  const paragraphId = searchParams.get('paragraphId');

  const skip = Number(searchParams.get('skip')) || 0;
  let take = Number(searchParams.get('take')) || 10;
  take = Math.min(take, 100);

  let res = null;
  const options: {
    include: {
      user: boolean;
    };
    orderBy: {
      createdAt: 'desc' | 'asc';
    };
    skip: number;
    take: number;
  } = {
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    skip,
    take,
  };
  switch (true) {
    case !!storyId:
      res = await prisma.storyComment.findMany({
        where: { storyId },
        ...options,
      });
      break;
    case !!chapterId:
      res = await prisma.chapterComment.findMany({
        where: { chapterId },
        ...options,
      });
      break;
    case !!paragraphId:
      res = await prisma.paragraphComment.findMany({
        where: { paragraphId },
        ...options,
      });
      break;
    default:
      return Response.json({ msg: 'id not found!' }, { status: 500 });
  }
  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const prisma = await getPrisma();
  const body: {
    content: string
    storyId?: string
    chapterId?: string
    paragraphId?: string
  } = await request.json();

  const storyId = body.storyId
  const chapterId = body.chapterId
  const paragraphId = body.paragraphId

  let created = null;
  const userId = 'x';
  switch (true) {
    case !!storyId:
      created = await prisma.storyComment.create({
        data: {
          content: body.content,
          storyId,
          userId,
        },
      });
      break;
    case !!chapterId:
      created = await prisma.chapterComment.create({
        data: {
          content: body.content,
          chapterId,
          userId,
        },
      });
      break;
    case !!paragraphId:
      created = await prisma.paragraphComment.create({
        data: {
          content: body.content,
          paragraphId,
          userId,
        },
      });
      break;
    default:
      return Response.json({ msg: 'id not found!' }, { status: 500 });
  }
  return Response.json(created);
}
