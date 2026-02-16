import { prisma } from '@/lib/prisma'
import type { User as SupabaseUser } from '@supabase/supabase-js'

/**
 * Sync Supabase Auth user to Prisma User table
 * Called after successful signup or OAuth login
 */
export async function syncUserToPrisma(
  supabaseUser: SupabaseUser,
  additionalData?: {
    firstName?: string
    lastName?: string
    role?: 'BUYER' | 'SELLER' | 'BOTH'
    businessName?: string
  }
) {
  const existingUser = await prisma.user.findUnique({
    where: { id: supabaseUser.id },
  })

  if (existingUser) {
    // Update lastLoginAt
    return await prisma.user.update({
      where: { id: supabaseUser.id },
      data: {
        lastLoginAt: new Date(),
        email: supabaseUser.email,
        emailVerified: supabaseUser.email_confirmed_at ? true : false,
      },
    })
  }

  // Create new user
  return await prisma.user.create({
    data: {
      id: supabaseUser.id,
      email: supabaseUser.email,
      phone: supabaseUser.phone,
      emailVerified: supabaseUser.email_confirmed_at ? true : false,
      phoneVerified: supabaseUser.phone_confirmed_at ? true : false,
      firstName: additionalData?.firstName || supabaseUser.user_metadata?.first_name,
      lastName: additionalData?.lastName || supabaseUser.user_metadata?.last_name,
      businessName: additionalData?.businessName,
      role: additionalData?.role || 'BUYER',
      googleId: supabaseUser.app_metadata?.provider === 'google' ? supabaseUser.id : undefined,
      lastLoginAt: new Date(),
    },
  })
}

/**
 * Get user by Supabase Auth ID
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  })
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

/**
 * Get user by phone
 */
export async function getUserByPhone(phone: string) {
  return await prisma.user.findUnique({
    where: { phone },
  })
}
