import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createCallSchema = z.object({
  dealId: z.string().uuid(),
  callType: z.enum(['VIDEO', 'AUDIO']),
  participantId: z.string().uuid(),
})

// POST: Create/initiate call
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
    const validated = createCallSchema.parse(body)

    // Verify user has access to this deal
    const deal = await prisma.deal.findUnique({
      where: { id: validated.dealId },
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

    // Generate room ID for call
    const roomId = `wakilchat-${validated.dealId}-${Date.now()}`

    // Create call record
    const call = await prisma.call.create({
      data: {
        dealId: validated.dealId,
        initiatorId: user.id,
        participantId: validated.participantId,
        callType: validated.callType,
        roomId,
        status: 'INITIATED',
      },
      include: {
        initiator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        participant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    })

    // In production, create Daily.co room here with their API
    // For now, return room URL format
    const roomUrl = `${process.env.NEXT_PUBLIC_APP_URL}/call/${roomId}`

    return NextResponse.json({
      call,
      roomUrl,
      roomId,
    }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/calls error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create call' },
      { status: 500 }
    )
  }
}

// GET: List calls for a deal
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
    const dealId = searchParams.get('dealId')

    if (!dealId) {
      return NextResponse.json(
        { error: 'dealId required' },
        { status: 400 }
      )
    }

    const calls = await prisma.call.findMany({
      where: {
        dealId,
        OR: [
          { initiatorId: user.id },
          { participantId: user.id },
        ],
      },
      include: {
        initiator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        participant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ calls })
  } catch (error: any) {
    console.error('GET /api/calls error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calls' },
      { status: 500 }
    )
  }
}
