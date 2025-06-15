export const runtime = 'edge';

import { type NextRequest } from 'next/server';
import { IStory } from '@/types/model';
import { getPrisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const prisma = await getPrisma();
  const body = await request.json();
  const { id } = await params;

  const {
    name,
    lang,
    originUrl,
    mature,
    cover,
    size,
    tagIds,
    description,
    finished,
  } = body as IStory & { tagIds: string[] };

  try {
    const updatedStory = await prisma.story.update({
      where: { id },
      data: {
        name,
        description,
        lang,
        originUrl,
        mature,
        cover,
        size,
        finished,
        updatedAt: new Date(),
        ...(tagIds && {
          tags: {
            set: tagIds.map((id: string) => ({ id })),
          },
        }),
      },
    });

    return Response.json(updatedStory);
  } catch (error) {
    return Response.json({ msg: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const prisma = await getPrisma();
  const { id } = await params;

  try {
    await prisma.story.update({
      where: { id },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ msg: String(error) }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const prisma = await getPrisma();
  const { id } = await params;

  try {
    const story = await prisma.story.findUnique({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
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
    });

    if (!story) return Response.json({ msg: 'Not found!' }, { status: 404 });
    return Response.json(story);
  } catch (error) {
    return Response.json({ msg: String(error) }, { status: 500 });
  }
}
