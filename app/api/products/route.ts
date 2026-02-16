import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const productSchema = z.object({
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
  price: z.number().positive('Price must be positive'),
  quantity: z.number().int().positive('Quantity must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  location: z.string().min(2, 'Location is required'),
  minOrderQty: z.number().int().positive().optional(),
  currency: z.string().default('ETB'),
})

// GET: List products
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

    const products = await prisma.product.findMany({
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

    const total = await prisma.product.count({ where })

    return NextResponse.json({
      products,
      total,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error('GET /api/products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST: Create product
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
    const validated = productSchema.parse(body)

    const product = await prisma.product.create({
      data: {
        userId: user.id,
        title: validated.title,
        description: validated.description,
        category: validated.category,
        price: validated.price,
        currency: validated.currency,
        quantity: validated.quantity,
        unit: validated.unit,
        location: validated.location,
        minOrderQty: validated.minOrderQty,
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

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/products error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
