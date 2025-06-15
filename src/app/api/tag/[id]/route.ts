export const runtime = 'edge';

import { ITagValue } from '@/types/model';
import { NextRequest } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const prisma = await getPrisma();
  const body = await request.json();
  const tagValues = body as ITagValue[];
  const { id } = await params;

  const updated = await prisma.tag.update({
    where: { id },
    data: {
      tagValues: {
        upsert: tagValues.map((value: any) => ({
          where: { tagId_lang: { tagId: id, lang: value.lang } },
          update: { lang: value.lang, name: value.name },
          create: { lang: value.lang, name: value.name },
        })),
      },
    },
  });

  return Response.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const prisma = await getPrisma();
  const { id } = await params;

  await prisma.tag.delete({ where: { id } });
  return Response.json({ success: true });
}
