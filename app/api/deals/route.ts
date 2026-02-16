import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const dealSchema = z.object({
  matchId: z.string().uuid(),
  dealName: z.string().min(5),
  agreedPrice: z.number().positive().optional(),
  quantity: z.number().positive().optional(),
  unit: z.string().optional(),
})

// GET: List user's deals
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined

    const where: any = {
      buyerId: user.id,
    }

    if (status) {
      where.status = status
    }

    const deals = await prisma.deal.findMany({
      where,
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
            buyRequest: {
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
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ deals })
  } catch (error: any) {
    console.error('GET /api/deals error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    )
  }
}

// POST: Create deal from match
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validated = dealSchema.parse(body)

    // Verify match exists and user is part of it
    const match = await prisma.match.findUnique({
      where: { id: validated.matchId },
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    if (match.buyerId !== user.id && match.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to create deal from this match' },
        { status: 403 }
      )
    }

    // Create deal
    const deal = await prisma.deal.create({
      data: {
        matchId: validated.matchId,
        buyerId: match.buyerId,
        dealName: validated.dealName,
        agreedPrice: validated.agreedPrice,
        quantity: validated.quantity,
        unit: validated.unit,
        status: 'NEGOTIATING',
        stage: 'INITIAL_CONTACT',
      },
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

    // Update match status
    await prisma.match.update({
      where: { id: validated.matchId },
      data: { status: 'CONVERTED_TO_DEAL' },
    })

    return NextResponse.json(deal, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/deals error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create deal' },
      { status: 500 }
    )
  }
}
