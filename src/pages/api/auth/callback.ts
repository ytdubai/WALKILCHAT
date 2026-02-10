import { createServerClient } from '@supabase/ssr'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string | undefined

  if (!code) {
    return res.redirect('/login?error=no_code')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xjbuktmaktupkssretbt.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqYnVrdG1ha3R1cGtzc3JldGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDEwOTgsImV4cCI6MjA4NTYxNzA5OH0.Cp6dschu3CWjHPCuf9k8GaibxP8hqE1PchLx3ox_opU'

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return req.cookies[name]
      },
      set(name: string, value: string, options: any) {
        res.setHeader('Set-Cookie', `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${options?.maxAge || 31536000}`)
      },
      remove(name: string, options: any) {
        res.setHeader('Set-Cookie', `${name}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`)
      },
    },
  })

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Code exchange error:', error)
      return res.redirect('/login?error=exchange_failed')
    }
    return res.redirect('/dashboard')
  } catch (err) {
    console.error('Auth callback error:', err)
    return res.redirect('/login?error=callback_failed')
  }
}
