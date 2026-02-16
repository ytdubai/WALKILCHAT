import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { EthioTelecomBilling, SUBSCRIPTION_PLANS, calculateNetRevenue } from '@/lib/billing/ethio-telecom'
import { z } from 'zod'

const subscribeSchema = z.object({
  planId: z.string(),
  phoneNumber: z.string().regex(/^\+251[79]\d{8}$/, 'Invalid Ethiopian phone number'),
  billingCycle: z.enum(['WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']),
})

// POST: Create subscription
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
    const validated = subscribeSchema.parse(body)

    // Get plan details
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === validated.planId)
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    if (plan.id === 'free') {
      return NextResponse.json(
        { error: 'Free plan does not require subscription' },
        { status: 400 }
      )
    }

    // Calculate subscription end date
    const startDate = new Date()
    const endDate = new Date(startDate)
    switch (validated.billingCycle) {
      case 'WEEKLY':
        endDate.setDate(endDate.getDate() + 7)
        break
      case 'MONTHLY':
        endDate.setMonth(endDate.getMonth() + 1)
        break
      case 'QUARTERLY':
        endDate.setMonth(endDate.getMonth() + 3)
        break
      case 'YEARLY':
        endDate.setFullYear(endDate.getFullYear() + 1)
        break
    }

    // Initiate carrier billing
    const billing = new EthioTelecomBilling()
    const payment = await billing.initiateSubscription({
      phoneNumber: validated.phoneNumber,
      planId: validated.planId,
      userId: user.id,
    })

    if (!payment.success) {
      return NextResponse.json(
        { error: payment.error || 'Payment failed' },
        { status: 400 }
      )
    }

    // Create subscription record
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: plan.id.toUpperCase() as any,
        billingCycle: validated.billingCycle,
        amount: plan.priceETB,
        currency: 'ETB',
        status: 'ACTIVE',
        paymentMethod: 'CARRIER_BILLING',
        transactionId: payment.transactionId,
        startDate,
        endDate,
        renewalDate: endDate,
      },
    })

    // Update user account type
    await prisma.user.update({
      where: { id: user.id },
      data: {
        accountType: plan.id.toUpperCase() as any,
      },
    })

    // Calculate revenue split
    const revenue = calculateNetRevenue(plan.priceETB)

    return NextResponse.json({
      subscription,
      payment: {
        transactionId: payment.transactionId,
        confirmationCode: payment.confirmationCode,
      },
      revenue,
      message: 'Subscription activated successfully',
    }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/subscriptions error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

// GET: Get user's active subscription
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        accountType: true,
      },
    })

    return NextResponse.json({
      subscription,
      accountType: userData?.accountType || 'FREE',
      plans: SUBSCRIPTION_PLANS,
    })
  } catch (error: any) {
    console.error('GET /api/subscriptions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}
