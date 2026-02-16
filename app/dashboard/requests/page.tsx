'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'AGRICULTURAL_PRODUCTS', label: 'Agricultural Products' },
  { value: 'LIVESTOCK', label: 'Livestock' },
  { value: 'MACHINERY_EQUIPMENT', label: 'Machinery & Equipment' },
  { value: 'CONSTRUCTION_MATERIALS', label: 'Construction Materials' },
  { value: 'TEXTILES_CLOTHING', label: 'Textiles & Clothing' },
  { value: 'FOOD_BEVERAGES', label: 'Food & Beverages' },
  { value: 'TECHNOLOGY_ELECTRONICS', label: 'Technology & Electronics' },
  { value: 'AUTOMOTIVE', label: 'Automotive' },
  { value: 'REAL_ESTATE', label: 'Real Estate' },
  { value: 'SERVICES', label: 'Services' },
  { value: 'OTHER', label: 'Other' },
]

const URGENCY_COLORS = {
  LOW: 'text-muted-foreground',
  NORMAL: 'text-foreground',
  HIGH: 'text-yellow-500',
  URGENT: 'text-red-500',
}

type BuyRequest = {
  id: string
  title: string
  description: string
  category: string
  minBudget: number | null
  maxBudget: number | null
  currency: string
  quantity: number | null
  unit: string | null
  location: string
  urgency: keyof typeof URGENCY_COLORS
  user: {
    firstName: string | null
    lastName: string | null
    businessName: string | null
    isVerified: boolean
  }
  createdAt: string
}

export default function BuyRequestsPage() {
  const [buyRequests, setBuyRequests] = useState<BuyRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBuyRequests()
  }, [category])

  const fetchBuyRequests = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      if (search) params.set('search', search)

      const response = await fetch(`/api/requests?${params}`)
      const data = await response.json()
      setBuyRequests(data.buyRequests || [])
    } catch (error) {
      console.error('Failed to fetch buy requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchBuyRequests()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-gradient">
            WakilChat™
          </Link>

          <Link
            href="/dashboard/requests/new"
            className="luxury-button-sm"
          >
            + Post Buy Request
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Buy Requests</h1>
          <p className="text-muted-foreground">
            Browse what buyers are looking for and respond to opportunities
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search buy requests..."
              className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buy Requests List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading buy requests...
          </div>
        ) : buyRequests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No buy requests found
            </div>
            <Link
              href="/dashboard/requests/new"
              className="inline-block luxury-button"
            >
              Post the First Buy Request
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {buyRequests.map(request => (
              <Link
                key={request.id}
                href={`/dashboard/requests/${request.id}`}
                className="luxury-card p-6 hover:border-primary/50 transition-all group flex flex-col md:flex-row gap-6"
              >
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {request.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {request.category.replace(/_/g, ' ')}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {request.location}
                        </div>

                        <span className={`font-medium ${URGENCY_COLORS[request.urgency]}`}>
                          {request.urgency}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {request.description}
                  </p>

                  {/* Buyer Info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                      {request.user.firstName?.[0] || request.user.businessName?.[0] || 'B'}
                    </div>
                    <span>
                      {request.user.businessName || `${request.user.firstName} ${request.user.lastName}`}
                    </span>
                    {request.user.isVerified && (
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Budget Info (if provided) */}
                {(request.minBudget || request.maxBudget) && (
                  <div className="md:w-48 flex flex-col items-end justify-center">
                    <div className="text-xs text-muted-foreground mb-1">Budget Range</div>
                    <div className="text-lg font-bold text-primary">
                      {request.minBudget && request.maxBudget ? (
                        <>
                          {request.minBudget.toLocaleString()} - {request.maxBudget.toLocaleString()}
                        </>
                      ) : request.maxBudget ? (
                        <>Up to {request.maxBudget.toLocaleString()}</>
                      ) : (
                        <>From {request.minBudget?.toLocaleString()}</>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{request.currency}</div>
                  </div>
                )}

                {/* Quantity Info (if provided) */}
                {request.quantity && (
                  <div className="md:w-32 flex flex-col items-end justify-center">
                    <div className="text-xs text-muted-foreground mb-1">Quantity</div>
                    <div className="text-lg font-bold">
                      {request.quantity.toLocaleString()}
                    </div>
                    {request.unit && (
                      <div className="text-xs text-muted-foreground">{request.unit}</div>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
