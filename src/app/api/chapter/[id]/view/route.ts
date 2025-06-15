export const runtime = 'edge';

import { type NextRequest } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const prisma = await getPrisma();
    const { id } = await params;

    const chapter = await prisma.chapter.update({
      where: {
        id,
      },
      data: {
        viewCount: {
          increment: 1,
        }
      },
    });

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ msg: String(e) }, { status: 500 });
  }
}
