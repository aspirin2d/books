export const runtime = 'edge';

import { type NextRequest } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { ECommentType } from '@/types/model';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const prisma = await getPrisma();
  const { id } = await params;
  if (!id) return Response.json({ msg: 'Missing id' }, { status: 400 });
  const userId = 'x';

  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get('type') as ECommentType;

  switch (type) {
    case ECommentType.STORY:
      await prisma.storyComment.delete({ where: { id, userId } });
      break;
    case ECommentType.CHAPTER:
      await prisma.chapterComment.delete({ where: { id, userId } });
      break;
    case ECommentType.PARAGRAPH:
      await prisma.paragraphComment.delete({ where: { id, userId } });
      break;
    default:
      return Response.json({ msg: 'type required!' }, { status: 500 });
  }

  await prisma.storyComment.delete({ where: { id } });
  return Response.json({ success: true });
}
