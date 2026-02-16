import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const dealId = params.id

    // Verify user has access to this deal
    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: {
        match: true,
      },
    })

    if (!deal) {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      )
    }

    if (deal.buyerId !== user.id && deal.match.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Fetch messages
    const messages = await prisma.message.findMany({
      where: {
        dealId,
        isDeleted: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        reactions: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json({ messages })
  } catch (error: any) {
    console.error('GET /api/deals/[id]/messages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
