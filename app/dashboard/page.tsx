import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/auth/actions'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient">WakilChat™</h1>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user.user_metadata?.first_name} {user.user_metadata?.last_name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            
            <form action={logout}>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-secondary hover:bg-accent border border-border rounded-lg transition-all"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user.user_metadata?.first_name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Your B2B marketplace dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="luxury-card p-6">
            <div className="text-muted-foreground text-sm mb-1">Active Deals</div>
            <div className="text-3xl font-bold">0</div>
          </div>
          
          <div className="luxury-card p-6">
            <div className="text-muted-foreground text-sm mb-1">New Matches</div>
            <div className="text-3xl font-bold text-primary">0</div>
          </div>
          
          <div className="luxury-card p-6">
            <div className="text-muted-foreground text-sm mb-1">Messages</div>
            <div className="text-3xl font-bold">0</div>
          </div>
          
          <div className="luxury-card p-6">
            <div className="text-muted-foreground text-sm mb-1">Products Listed</div>
            <div className="text-3xl font-bold">0</div>
          </div>
        </div>

        {/* Success Message */}
        <div className="luxury-card p-8 text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">🎉 Authentication System Complete!</h3>
          <p className="text-muted-foreground mb-6">
            You've successfully logged in to WakilChat™. The complete auth flow is working:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
              <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-medium">Email Authentication</div>
                <div className="text-sm text-muted-foreground">Sign up & login with email</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
              <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-medium">Phone OTP</div>
                <div className="text-sm text-muted-foreground">SMS verification ready</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
              <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-medium">Google OAuth</div>
                <div className="text-sm text-muted-foreground">Social login configured</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
              <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-medium">Protected Routes</div>
                <div className="text-sm text-muted-foreground">Middleware security active</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary mb-2">✅ Day 1-2 Complete!</p>
            <p className="text-sm text-muted-foreground">
              Project structure, Prisma schema, dark luxury theme, and full authentication system are ready.
              Next: Product listings, matching engine, and real-time chat.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
