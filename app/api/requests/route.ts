import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { matchBuyRequestWithProducts } from '@/lib/ai/matching'
import { z } from 'zod'

const buyRequestSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum([
    'AGRICULTURAL_PRODUCTS',
    'LIVESTOCK',
    'MACHINERY_EQUIPMENT',
    'CONSTRUCTION_MATERIALS',
    'TEXTILES_CLOTHING',
    'FOOD_BEVERAGES',
    'TECHNOLOGY_ELECTRONICS',
    'AUTOMOTIVE',
    'REAL_ESTATE',
    'SERVICES',
    'OTHER',
  ]),
  minBudget: z.number().positive().optional(),
  maxBudget: z.number().positive().optional(),
  quantity: z.number().int().positive().optional(),
  unit: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  urgency: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),
})

// GET: List buy requests
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      status: 'ACTIVE',
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const buyRequests = await prisma.buyRequest.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    const total = await prisma.buyRequest.count({ where })

    return NextResponse.json({
      buyRequests,
      total,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error('GET /api/requests error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch buy requests' },
      { status: 500 }
    )
  }
}

// POST: Create buy request
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
    const validated = buyRequestSchema.parse(body)

    const buyRequest = await prisma.buyRequest.create({
      data: {
        userId: user.id,
        title: validated.title,
        description: validated.description,
        category: validated.category,
        minBudget: validated.minBudget,
        maxBudget: validated.maxBudget,
        quantity: validated.quantity,
        unit: validated.unit,
        location: validated.location,
        urgency: validated.urgency,
        status: 'ACTIVE',
      },
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
    })

    // Trigger AI matching in background (non-blocking)
    matchBuyRequestWithProducts(buyRequest.id).catch(error => {
      console.error('AI matching failed:', error)
      // Don't fail the request creation if matching fails
    })

    return NextResponse.json(buyRequest, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/requests error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create buy request' },
      { status: 500 }
    )
  }
}
