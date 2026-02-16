'use client'

import { useEffect, useState } from 'react'
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
    user: {
      firstName: string | null
      lastName: string | null
      businessName: string | null
      isVerified: boolean
    }
  }
  buyerId: string
  sellerId: string
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchMatches()
  }, [filter])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter) params.set('status', filter)

      const response = await fetch(`/api/matches?${params}`)
      const data = await response.json()
      setMatches(data.matches || [])
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 65) return 'text-primary'
    return 'text-yellow-500'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 65) return 'Good'
    return 'Fair'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-gradient">
            WakilChat™
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Matches</h1>
          <p className="text-muted-foreground">
            Smart matches between buy requests and products
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === ''
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-accent'
            }`}
          >
            All Matches
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'PENDING'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-accent'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('ACCEPTED')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'ACCEPTED'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-accent'
            }`}
          >
            Accepted
          </button>
        </div>

        {/* Matches List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading matches...
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-muted-foreground mb-4">
              No matches found yet
            </div>
            <div className="text-sm text-muted-foreground mb-6">
              Post buy requests or list products to get AI-powered matches
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/products/new" className="luxury-button">
                List a Product
              </Link>
              <Link href="/dashboard/requests/new" className="luxury-button">
                Post Buy Request
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map(match => (
              <div key={match.id} className="luxury-card p-6">
                {/* Match Score */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl font-bold ${getScoreColor(match.aiScore)}`}>
                      {match.aiScore}%
                    </div>
                    <div>
                      <div className="text-sm font-medium">{getScoreLabel(match.aiScore)} Match</div>
                      <div className="text-xs text-muted-foreground">AI Confidence Score</div>
                    </div>
                  </div>

                  <div className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${match.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                    ${match.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-500' : ''}
                    ${match.status === 'REJECTED' ? 'bg-red-500/20 text-red-500' : ''}
                  `}>
                    {match.status}
                  </div>
                </div>

                {/* Match Reason */}
                <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Why this match?</div>
                  <div className="text-sm">{match.matchReason}</div>
                </div>

                {/* Product & Buy Request */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product */}
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-2">Product</div>
                    <Link href={`/dashboard/products/${match.product.id}`} className="font-semibold hover:text-primary transition-colors mb-2 block">
                      {match.product.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {match.product.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">
                        {match.product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {match.product.currency}/{match.product.unit}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Seller: {match.product.user.businessName || `${match.product.user.firstName} ${match.product.user.lastName}`}
                      {match.product.user.isVerified && ' ✓'}
                    </div>
                  </div>

                  {/* Buy Request */}
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-2">Buy Request</div>
                    <Link href={`/dashboard/requests/${match.buyRequest.id}`} className="font-semibold hover:text-primary transition-colors mb-2 block">
                      {match.buyRequest.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {match.buyRequest.description}
                    </p>
                    {match.buyRequest.maxBudget && (
                      <div className="text-sm mb-3">
                        <span className="text-muted-foreground">Budget:</span>{' '}
                        <span className="font-medium">Up to {match.buyRequest.maxBudget.toLocaleString()} ETB</span>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      Buyer: {match.buyRequest.user.businessName || `${match.buyRequest.user.firstName} ${match.buyRequest.user.lastName}`}
                      {match.buyRequest.user.isVerified && ' ✓'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {match.status === 'PENDING' && (
                  <div className="mt-6 pt-6 border-t border-border flex gap-4">
                    <Link
                      href={`/dashboard/deals/new?matchId=${match.id}`}
                      className="flex-1 luxury-button text-center"
                    >
                      Start Negotiation
                    </Link>
                    <button
                      className="px-6 py-3 bg-secondary hover:bg-accent border border-border rounded-lg font-semibold transition-all"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
