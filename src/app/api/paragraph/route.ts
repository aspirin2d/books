// app/api/paragraph/route.ts
export const runtime = 'edge'

import { NextRequest } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { ParagraphType } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = await getPrisma()
  const chapterId = request.nextUrl.searchParams.get('chapterId')

  if (!chapterId) {
    return Response.json({ error: 'Missing chapterId' }, { status: 400 })
  }

  const paragraphs = await prisma.paragraph.findMany({
    where: {
      chapterId,
      deletedAt: null,
    },
    orderBy: { index: 'asc' },
  })

  return Response.json(paragraphs)
}

export async function POST(request: NextRequest) {
  const prisma = await getPrisma()
  const body = await request.json()

  const { chapterId, index, type, content } = body

  if (!chapterId || index === undefined || !type || !content) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  const created = await prisma.paragraph.create({
    data: {
      chapterId,
      index,
      type,
      content,
    },
  })

  return Response.json(created)
}

export async function PUT(request: NextRequest) {
  const prisma = await getPrisma()
  const body = await request.json()

  const { id, index, type, content } = body

  if (!id) {
    return Response.json({ error: 'Missing paragraph id' }, { status: 400 })
  }

  const updated = await prisma.paragraph.update({
    where: { id },
    data: {
      ...(index !== undefined && { index }),
      ...(type && { type }),
      ...(content && { content }),
      updatedAt: new Date(),
    },
  })

  return Response.json(updated)
}

export async function DELETE(request: NextRequest) {
  const prisma = await getPrisma()
  const id = request.nextUrl.searchParams.get('id')

  if (!id) {
    return Response.json({ error: 'Missing paragraph id' }, { status: 400 })
  }

  const deleted = await prisma.paragraph.update({
    where: { id },
    data: { deletedAt: new Date() },
  })

  return Response.json({ success: true, data: deleted })
}
