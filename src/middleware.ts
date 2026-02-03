import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard', '/shop', '/messages', '/orders', '/payments', '/profile']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // Auth routes that should redirect if logged in
  const authPaths = ['/login', '/signup']
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // Redirect if not authenticated on protected routes
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if authenticated on auth routes
  if (isAuthPath && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/shop/:path*',
    '/messages/:path*',
    '/orders/:path*',
    '/payments/:path*',
    '/profile/:path*',
    '/login',
    '/signup',
  ],
}