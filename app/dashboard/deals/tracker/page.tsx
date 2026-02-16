'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const DEAL_STAGES = [
  { value: 'INITIAL_CONTACT', label: 'Initial Contact', color: 'bg-blue-500' },
  { value: 'PRICE_NEGOTIATION', label: 'Price Negotiation', color: 'bg-yellow-500' },
  { value: 'TERMS_DISCUSSION', label: 'Terms Discussion', color: 'bg-orange-500' },
  { value: 'CONTRACT_REVIEW', label: 'Contract Review', color: 'bg-purple-500' },
  { value: 'PAYMENT_PENDING', label: 'Payment Pending', color: 'bg-pink-500' },
  { value: 'DELIVERY_ARRANGED', label: 'Delivery Arranged', color: 'bg-teal-500' },
  { value: 'COMPLETED', label: 'Completed', color: 'bg-green-500' },
]

type Deal = {
  id: string
  dealName: string
  stage: string
  status: string
  agreedPrice: number | null
  currency: string
  createdAt: string
  match: {
    product: {
      title: string
      user: {
        firstName: string | null
        lastName: string | null
        businessName: string | null
      }
    }
  }
}

export default function DealTrackerPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)

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

  const dealsByStage = DEAL_STAGES.map(stage => ({
    ...stage,
    deals: deals.filter(deal => deal.stage === stage.value),
  }))

  const filteredDeals = selectedStage
    ? deals.filter(deal => deal.stage === selectedStage)
    : deals

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-2xl font-bold text-gradient">
              WakilChat™
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-lg font-semibold">Deal Tracker</h1>
          </div>

          <Link
            href="/dashboard/deals"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Deals
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Deals</div>
            <div className="text-3xl font-bold">{deals.length}</div>
          </div>

          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Active</div>
            <div className="text-3xl font-bold text-primary">
              {deals.filter(d => d.status === 'NEGOTIATING').length}
            </div>
          </div>

          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-500">
              {deals.filter(d => d.status === 'COMPLETED').length}
            </div>
          </div>

          <div className="luxury-card p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Value</div>
            <div className="text-2xl font-bold text-primary">
              {deals.reduce((sum, d) => sum + (d.agreedPrice || 0), 0).toLocaleString()} ETB
            </div>
          </div>
        </div>

        {/* Pipeline View */}
        <div className="luxury-card p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Pipeline</h2>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {dealsByStage.map((stage, index) => (
              <div key={stage.value} className="relative">
                <button
                  onClick={() => setSelectedStage(selectedStage === stage.value ? null : stage.value)}
                  className={`
                    w-full p-4 rounded-lg border-2 transition-all text-left
                    ${selectedStage === stage.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className={`w-3 h-3 rounded-full ${stage.color} mb-2`} />
                  <div className="text-sm font-medium mb-1">{stage.label}</div>
                  <div className="text-2xl font-bold">{stage.deals.length}</div>
                </button>

                {index < dealsByStage.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deals List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {selectedStage
                ? `${DEAL_STAGES.find(s => s.value === selectedStage)?.label} Deals`
                : 'All Deals'
              }
            </h2>
            {selectedStage && (
              <button
                onClick={() => setSelectedStage(null)}
                className="text-sm text-primary hover:text-primary/80"
              >
                Clear filter
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading deals...
            </div>
          ) : filteredDeals.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                {selectedStage ? 'No deals in this stage' : 'No deals yet'}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeals.map(deal => (
                <Link
                  key={deal.id}
                  href={`/dashboard/deals/${deal.id}`}
                  className="luxury-card p-6 hover:border-primary/50 transition-all group flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {deal.dealName}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3">
                      Product: {deal.match.product.title}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`
                          w-2 h-2 rounded-full
                          ${DEAL_STAGES.find(s => s.value === deal.stage)?.color || 'bg-gray-500'}
                        `} />
                        <span className="text-muted-foreground">
                          {DEAL_STAGES.find(s => s.value === deal.stage)?.label}
                        </span>
                      </div>

                      <div className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${deal.status === 'NEGOTIATING' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                        ${deal.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' : ''}
                      `}>
                        {deal.status}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {deal.agreedPrice && (
                      <div className="text-lg font-bold text-primary mb-1">
                        {deal.agreedPrice.toLocaleString()} {deal.currency}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      Started {new Date(deal.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
