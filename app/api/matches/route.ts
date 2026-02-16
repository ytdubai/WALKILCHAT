import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

// GET: List matches for current user
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
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      OR: [
        { buyerId: user.id },
        { sellerId: user.id },
      ],
    }

    if (status) {
      where.status = status
    }

    const matches = await prisma.match.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    const total = await prisma.match.count({ where })

    return NextResponse.json({
      matches,
      total,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error('GET /api/matches error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    )
  }
}
