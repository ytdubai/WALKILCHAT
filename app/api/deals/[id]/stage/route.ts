import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateStageSchema = z.object({
  stage: z.enum([
    'INITIAL_CONTACT',
    'PRICE_NEGOTIATION',
    'TERMS_DISCUSSION',
    'CONTRACT_REVIEW',
    'PAYMENT_PENDING',
    'DELIVERY_ARRANGED',
    'COMPLETED',
  ]),
  status: z.enum([
    'NEGOTIATING',
    'AGREEMENT_REACHED',
    'PAYMENT_PROCESSING',
    'COMPLETED',
    'CANCELLED',
    'DISPUTED',
  ]).optional(),
  agreedPrice: z.number().positive().optional(),
  quantity: z.number().positive().optional(),
})

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

    const dealId = params.id
    const body = await request.json()
    const validated = updateStageSchema.parse(body)

    // Verify user has access to this deal
    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: { match: true },
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

    // Update deal
    const updatedDeal = await prisma.deal.update({
      where: { id: dealId },
      data: {
        stage: validated.stage,
        ...(validated.status && { status: validated.status }),
        ...(validated.agreedPrice && { agreedPrice: validated.agreedPrice }),
        ...(validated.quantity && { quantity: validated.quantity }),
        ...(validated.stage === 'COMPLETED' && !deal.closedAt && {
          closedAt: new Date(),
          status: 'COMPLETED',
        }),
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
            isVerified: true,
          },
        },
      },
    })

    // Create notification for the other party
    const otherUserId = deal.buyerId === user.id ? deal.match.sellerId : deal.buyerId
    await prisma.notification.create({
      data: {
        userId: otherUserId,
        type: 'DEAL_UPDATE',
        title: 'Deal Updated',
        titleAm: 'ስምምነት ዘመናዊ ሆኗል',
        message: `Deal stage changed to: ${validated.stage.replace(/_/g, ' ')}`,
        messageAm: `የስምምነት ደረጃ ተለውጧል ወደ: ${validated.stage.replace(/_/g, ' ')}`,
        actionUrl: `/dashboard/deals/${dealId}`,
        metadata: {
          dealId,
          stage: validated.stage,
          updatedBy: user.id,
        },
      },
    })

    return NextResponse.json(updatedDeal)
  } catch (error: any) {
    console.error('PATCH /api/deals/[id]/stage error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update deal stage' },
      { status: 500 }
    )
  }
}
