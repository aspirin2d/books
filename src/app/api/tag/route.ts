export const runtime = 'edge';

import { ITagValue } from '@/types/model';
import { NextRequest } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const prisma = await getPrisma();
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      tagValues: {
        select: {
          lang: true,
          name: true,
        },
      },
    },
  });
  return Response.json(tags);
}

export async function POST(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const body = (await request.json()) as ITagValue[];

    const duplicates = await prisma.tagValue.findMany({
      where: {
        OR: body.map(({ lang, name }) => ({ lang, name })),
      },
    });

    if (duplicates.length > 0) {
      return Response.json(
        {
          msg: `Some tag values already exist: ${duplicates.map((t) => t.lang + '-' + t.name)}`,
        },
        { status: 409 },
      );
    }

    const created = await prisma.tag.create({
      data: {
        tagValues: {
          create: body,
        },
      },
    });
    return Response.json(created);
  } catch (e) {
    return Response.json({ msg: String(e) }, { status: 500 });
  }
}
