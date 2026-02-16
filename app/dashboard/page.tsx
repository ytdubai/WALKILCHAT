'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-gradient">
            WakilChat™
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/products" className="text-sm hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/dashboard/requests" className="text-sm hover:text-primary transition-colors">
              Buy Requests
            </Link>
            <Link href="/dashboard/matches" className="text-sm hover:text-primary transition-colors">
              Matches
            </Link>
            <Link href="/dashboard/deals" className="text-sm hover:text-primary transition-colors">
              Deals
            </Link>
            
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            {user?.email}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/dashboard/products/new" className="luxury-card p-6 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">List a Product</h3>
            <p className="text-sm text-muted-foreground">
              Create a new product listing and reach buyers
            </p>
          </Link>

          <Link href="/dashboard/requests/new" className="luxury-card p-6 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Post a Buy Request</h3>
            <p className="text-sm text-muted-foreground">
              Tell sellers what you're looking for
            </p>
          </Link>

          <Link href="/dashboard/products" className="luxury-card p-6 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Browse Marketplace</h3>
            <p className="text-sm text-muted-foreground">
              Explore products from Ethiopian exporters
            </p>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Products</div>
            <div className="text-3xl font-bold">0</div>
          </div>

          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Buy Requests</div>
            <div className="text-3xl font-bold">0</div>
          </div>

          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Matches</div>
            <div className="text-3xl font-bold text-primary">0</div>
          </div>

          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Deals</div>
            <div className="text-3xl font-bold text-primary">0</div>
          </div>
        </div>
      </main>
    </div>
  )
}
