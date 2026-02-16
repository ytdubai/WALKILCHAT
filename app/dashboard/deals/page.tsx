'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Deal = {
  id: string
  dealName: string
  status: string
  stage: string
  createdAt: string
  match: {
    product: {
      title: string
      price: number
      currency: string
      user: {
        firstName: string | null
        lastName: string | null
        businessName: string | null
        isVerified: boolean
      }
    }
  }
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/deals')
      const data = await response.json()
      setDeals(data.deals || [])
    } catch (error) {
      console.error('Failed to fetch deals:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-gradient">
            WakilChat™
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Active Deals</h1>
          <p className="text-muted-foreground">
            Your ongoing negotiations and agreements
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading deals...
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No active deals yet
            </div>
            <Link
              href="/dashboard/matches"
              className="inline-block luxury-button"
            >
              View Matches
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {deals.map(deal => (
              <Link
                key={deal.id}
                href={`/dashboard/deals/${deal.id}`}
                className="luxury-card p-6 hover:border-primary/50 transition-all group flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {deal.dealName}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    Product: {deal.match.product.title}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div>
                      Seller: {deal.match.product.user.businessName || 
                        `${deal.match.product.user.firstName} ${deal.match.product.user.lastName}`}
                      {deal.match.product.user.isVerified && ' ✓'}
                    </div>

                    <div className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${deal.status === 'NEGOTIATING' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                      ${deal.status === 'AGREEMENT_REACHED' ? 'bg-green-500/20 text-green-500' : ''}
                      ${deal.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-500' : ''}
                    `}>
                      {deal.status.replace(/_/g, ' ')}
                    </div>

                    <div className="text-xs">
                      Stage: {deal.stage.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-primary mb-1">
                    {deal.match.product.price.toLocaleString()} {deal.match.product.currency}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Started {new Date(deal.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
