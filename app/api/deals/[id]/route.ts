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

    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: {
        match: {
          include: {
            product: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    businessName: true,
                    avatar: true,
                    isVerified: true,
                  },
                },
              },
            },
            buyRequest: true,
            seller: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                businessName: true,
                avatar: true,
                isVerified: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            businessName: true,
            avatar: true,
            isVerified: true,
          },
        },
      },
    })

    if (!deal) {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      )
    }

    // Verify user has access
    if (deal.buyerId !== user.id && deal.match.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    return NextResponse.json(deal)
  } catch (error: any) {
    console.error('GET /api/deals/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deal' },
      { status: 500 }
    )
  }
}
