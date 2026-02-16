import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUserById } from '@/lib/auth/sync'
import { prisma } from '@/lib/prisma'

/**
 * Test endpoint to verify auth-to-Prisma integration
 * GET /api/auth/test
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()

    if (error || !supabaseUser) {
      return NextResponse.json({
        status: 'unauthenticated',
        message: 'No active session',
        supabaseError: error?.message,
      })
    }

    // Check if user exists in Prisma database
    const prismaUser = await getUserById(supabaseUser.id)

    if (!prismaUser) {
      return NextResponse.json({
        status: 'error',
        message: 'User exists in Supabase Auth but not in Prisma database',
        supabaseUserId: supabaseUser.id,
        recommendation: 'This should not happen. Check syncUserToPrisma is called on signup/login.',
      })
    }

    // Verify data consistency
    const dataConsistent = 
      prismaUser.email === supabaseUser.email &&
      prismaUser.phone === supabaseUser.phone

    return NextResponse.json({
      status: 'success',
      message: 'Auth-to-Prisma bridge is working correctly',
      supabaseAuth: {
        id: supabaseUser.id,
        email: supabaseUser.email,
        phone: supabaseUser.phone,
        emailConfirmed: !!supabaseUser.email_confirmed_at,
        phoneConfirmed: !!supabaseUser.phone_confirmed_at,
      },
      prismaUser: {
        id: prismaUser.id,
        email: prismaUser.email,
        phone: prismaUser.phone,
        firstName: prismaUser.firstName,
        lastName: prismaUser.lastName,
        role: prismaUser.role,
        accountType: prismaUser.accountType,
        isVerified: prismaUser.isVerified,
        lastLoginAt: prismaUser.lastLoginAt,
      },
      dataConsistent,
      totalUsersInDatabase: await prisma.user.count(),
    })
  } catch (error: any) {
    console.error('Auth test error:', error)
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 })
  }
}
