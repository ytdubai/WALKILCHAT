import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const matchActionSchema = z.object({
  action: z.enum(['accept', 'reject']),
})

// PATCH: Accept or reject a match
export async function PATCH(
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

    const matchId = params.id
    const body = await request.json()
    const validated = matchActionSchema.parse(body)

    // Get match and verify user is part of it
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        product: true,
        buyRequest: true,
      },
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    if (match.buyerId !== user.id && match.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to modify this match' },
        { status: 403 }
      )
    }

    // Update match status
    const newStatus = validated.action === 'accept' ? 'ACCEPTED' : 'REJECTED'
    
    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: {
        status: newStatus,
        // Mark as viewed by the user taking action
        ...(match.buyerId === user.id 
          ? { buyerViewed: true, buyerViewedAt: new Date() }
          : { sellerViewed: true, sellerViewedAt: new Date() }
        ),
      },
      include: {
        product: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                businessName: true,
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
                isVerified: true,
              },
            },
          },
        },
      },
    })

    // If accepted, create notification for the other party
    if (validated.action === 'accept') {
      const otherUserId = match.buyerId === user.id ? match.sellerId : match.buyerId
      const isUserBuyer = match.buyerId === user.id
      
      await prisma.notification.create({
        data: {
          userId: otherUserId,
          type: 'NEW_MATCH',
          title: isUserBuyer ? 'Buyer Accepted Match!' : 'Seller Accepted Match!',
          titleAm: isUserBuyer ? 'ገዢው ተስማምቷል!' : 'ሻጭ ተስማምቷል!',
          message: `${isUserBuyer ? 'The buyer' : 'The seller'} has accepted your match. You can now start negotiating!`,
          messageAm: `${isUserBuyer ? 'ገዢው' : 'ሻጭ'} ተስማምተዋል። አሁን መደራደር ይችላሉ!`,
          actionUrl: `/dashboard/matches/${matchId}`,
          metadata: { matchId, action: 'accepted' },
        },
      })
    }

    return NextResponse.json(updatedMatch)
  } catch (error: any) {
    console.error('PATCH /api/matches/[id] error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update match' },
      { status: 500 }
    )
  }
}

// GET: Get single match details
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

    const matchId = params.id

    const match = await prisma.match.findUnique({
      where: { id: matchId },
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
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    // Verify user has access
    if (match.buyerId !== user.id && match.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Mark as viewed by current user
    if (match.buyerId === user.id && !match.buyerViewed) {
      await prisma.match.update({
        where: { id: matchId },
        data: {
          buyerViewed: true,
          buyerViewedAt: new Date(),
        },
      })
    } else if (match.sellerId === user.id && !match.sellerViewed) {
      await prisma.match.update({
        where: { id: matchId },
        data: {
          sellerViewed: true,
          sellerViewedAt: new Date(),
        },
      })
    }

    return NextResponse.json(match)
  } catch (error: any) {
    console.error('GET /api/matches/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch match' },
      { status: 500 }
    )
  }
}
