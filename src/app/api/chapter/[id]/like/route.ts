export const runtime = 'edge';

import { NextRequest } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getUser();
  const userId:string = user?.id as string;
  if (!user) return Response.json({ msg: 'Not login!' }, { status: 401 });
  const { id } = await params;

  const prisma = await getPrisma();

  await prisma.chapterLike.create({
    data: { userId, chapterId: id },
  });

  return Response.json({success: true});
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getUser();
  const userId:string = user?.id as string;
  if (!user) return Response.json({ msg: 'Not login!' }, { status: 401 });
  const { id } = await params;

  const prisma = await getPrisma();

  await prisma.chapterLike.delete({
    where: {
      userId_chapterId: {
        userId,
        chapterId: id,
      },
    },
  });

  return Response.json({ success: true });
}
