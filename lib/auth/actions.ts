'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { syncUserToPrisma } from '@/lib/auth/sync'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

// Validation schemas
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.enum(['BUYER', 'SELLER', 'BOTH']),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const phoneLoginSchema = z.object({
  phone: z.string().min(10, 'Valid phone number is required'),
})

// Email Signup
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const validatedFields = signupSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    role: formData.get('role') as string,
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    }
  }

  const { email, password, firstName, lastName, role } = validatedFields.data

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role,
      },
    },
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user' }
  }

  // Sync to Prisma User table
  try {
    await syncUserToPrisma(authData.user, {
      firstName,
      lastName,
      role,
    })
  } catch (error) {
    console.error('Failed to sync user to database:', error)
    // Continue anyway - user is created in Supabase Auth
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// Email Login
export async function login(formData: FormData) {
  const supabase = await createClient()

  const validatedFields = loginSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    }
  }

  const { email, password } = validatedFields.data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Get user and sync to Prisma
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    try {
      await syncUserToPrisma(user)
    } catch (error) {
      console.error('Failed to sync user login:', error)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// Phone OTP - Request
export async function requestPhoneOTP(formData: FormData) {
  const supabase = await createClient()

  const validatedFields = phoneLoginSchema.safeParse({
    phone: formData.get('phone') as string,
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    }
  }

  const { phone } = validatedFields.data

  const { error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      channel: 'sms',
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

// Phone OTP - Verify
export async function verifyPhoneOTP(formData: FormData) {
  const supabase = await createClient()

  const phone = formData.get('phone') as string
  const token = formData.get('token') as string

  if (!phone || !token) {
    return { error: 'Phone and OTP code are required' }
  }

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  })

  if (error) {
    return { error: error.message }
  }

  // Get user and sync to Prisma
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    try {
      await syncUserToPrisma(user)
    } catch (error) {
      console.error('Failed to sync phone OTP user:', error)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// Google OAuth
export async function signInWithGoogle() {
  'use server'
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google OAuth error:', error.message)
    redirect('/auth/login?error=oauth_failed')
  }

  if (data.url) {
    redirect(data.url)
  }
}

// Logout
export async function logout() {
  'use server'
  const supabase = await createClient()
  
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

// Get current user
export async function getCurrentUser() {
  const supabase = await createClient()
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}
