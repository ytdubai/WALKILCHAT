'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type Match = {
  id: string
  aiScore: number
  matchReason: string
  status: string
  createdAt: string
  product: {
    id: string
    title: string
    description: string
    price: number
    currency: string
    quantity: number
    unit: string
    location: string
    images: string[]
    user: {
      firstName: string | null
      lastName: string | null
      businessName: string | null
      isVerified: boolean
    }
  }
  buyRequest: {
    id: string
    title: string
    description: string
    maxBudget: number | null
    quantity: number | null
    unit: string | null
    location: string
    user: {
      firstName: string | null
      lastName: string | null
      businessName: string | null
      isVerified: boolean
    }
  }
}

export default function MatchDetailPage() {
  const params = useParams()
  const router = useRouter()
  const matchId = params.id as string
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchMatch()
  }, [matchId])

  const fetchMatch = async () => {
    try {
      const response = await fetch(`/api/matches/${matchId}`)
      const data = await response.json()
      setMatch(data)
    } catch (error) {
      console.error('Failed to fetch match:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (action: 'accept' | 'reject') => {
    setActionLoading(true)
    try {
      const response = await fetch(`/api/matches/${matchId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) throw new Error('Failed to update match')

      await fetchMatch()
    } catch (error) {
      console.error('Failed to update match:', error)
      alert('Failed to update match. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 65) return 'text-primary'
    return 'text-yellow-500'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 65) return 'Good Match'
    return 'Fair Match'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Match not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/matches" className="text-muted-foreground hover:text-foreground">
              ← Back to Matches
            </Link>
          </div>

          <div className={`
            px-4 py-2 rounded-full text-sm font-medium
            ${match.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' : ''}
            ${match.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-500' : ''}
            ${match.status === 'REJECTED' ? 'bg-red-500/20 text-red-500' : ''}
          `}>
            {match.status}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Match Score Hero */}
        <div className="luxury-card p-8 mb-8 text-center">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(match.aiScore)}`}>
            {match.aiScore}%
          </div>
          <div className="text-xl font-semibold mb-4">{getScoreLabel(match.aiScore)}</div>
          <div className="max-w-2xl mx-auto p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-sm font-medium text-primary mb-2">Why This Match?</div>
            <div className="text-sm text-muted-foreground">{match.matchReason}</div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Card */}
          <div className="luxury-card p-6">
            <div className="text-xs text-primary font-medium mb-4">PRODUCT OFFERED</div>
            
            {match.product.images.length > 0 && (
              <div className="mb-4">
                <img
                  src={match.product.images[0]}
                  alt={match.product.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold mb-3">{match.product.title}</h2>
            <p className="text-muted-foreground mb-4">{match.product.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="text-lg font-bold text-primary">
                  {match.product.price.toLocaleString()} {match.product.currency}/{match.product.unit}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available Quantity</span>
                <span className="font-semibold">
                  {match.product.quantity.toLocaleString()} {match.product.unit}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="font-semibold">{match.product.location}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1">Seller</div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">
                  {match.product.user.businessName || 
                    `${match.product.user.firstName} ${match.product.user.lastName}`}
                </div>
                {match.product.user.isVerified && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Buy Request Card */}
          <div className="luxury-card p-6">
            <div className="text-xs text-primary font-medium mb-4">BUY REQUEST</div>
            
            <h2 className="text-2xl font-bold mb-3">{match.buyRequest.title}</h2>
            <p className="text-muted-foreground mb-4">{match.buyRequest.description}</p>

            <div className="space-y-3 mb-6">
              {match.buyRequest.maxBudget && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <span className="text-lg font-bold text-primary">
                    Up to {match.buyRequest.maxBudget.toLocaleString()} ETB
                  </span>
                </div>
              )}

              {match.buyRequest.quantity && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quantity Needed</span>
                  <span className="font-semibold">
                    {match.buyRequest.quantity.toLocaleString()} {match.buyRequest.unit}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Destination</span>
                <span className="font-semibold">{match.buyRequest.location}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1">Buyer</div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">
                  {match.buyRequest.user.businessName || 
                    `${match.buyRequest.user.firstName} ${match.buyRequest.user.lastName}`}
                </div>
                {match.buyRequest.user.isVerified && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {match.status === 'PENDING' && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleAction('accept')}
              disabled={actionLoading}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {actionLoading ? 'Processing...' : '✓ Accept This Match'}
            </button>
            <button
              onClick={() => handleAction('reject')}
              disabled={actionLoading}
              className="px-8 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/20 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              ✕ Reject
            </button>
          </div>
        )}

        {match.status === 'ACCEPTED' && (
          <div className="text-center">
            <Link
              href={`/dashboard/deals/new?matchId=${match.id}`}
              className="inline-block luxury-button text-lg px-8 py-4"
            >
              Start Negotiation →
            </Link>
          </div>
        )}

        {match.status === 'REJECTED' && (
          <div className="text-center text-muted-foreground">
            This match was declined
          </div>
        )}
      </main>
    </div>
  )
}
