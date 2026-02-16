'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = [
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

const URGENCY_LEVELS = [
  { value: 'LOW', label: 'Low', color: 'text-muted-foreground' },
  { value: 'NORMAL', label: 'Normal', color: 'text-foreground' },
  { value: 'HIGH', label: 'High', color: 'text-yellow-500' },
  { value: 'URGENT', label: 'Urgent', color: 'text-red-500' },
]

export default function NewBuyRequestPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [urgency, setUrgency] = useState<'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'>('NORMAL')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      minBudget: formData.get('minBudget') ? parseFloat(formData.get('minBudget') as string) : undefined,
      maxBudget: formData.get('maxBudget') ? parseFloat(formData.get('maxBudget') as string) : undefined,
      quantity: formData.get('quantity') ? parseInt(formData.get('quantity') as string) : undefined,
      unit: formData.get('unit') as string || undefined,
      location: formData.get('location') as string,
      urgency,
    }

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create buy request')
      }

      const request = await response.json()
      router.push(`/dashboard/requests/${request.id}`)
    } catch (err: any) {
      setError(err.message)
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
          
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a Buy Request</h1>
          <p className="text-muted-foreground">
            Tell sellers what you're looking for and let AI match you with suppliers
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="luxury-card p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              What are you looking for? *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Ethiopian Coffee - Yirgacheffe Grade 1"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Detailed Requirements *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Describe quality requirements, certifications needed, delivery timeline, any special conditions..."
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Budget Range (optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="minBudget"
                  name="minBudget"
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Min (ETB)"
                />
              </div>

              <div>
                <input
                  id="maxBudget"
                  name="maxBudget"
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Max (ETB)"
                />
              </div>
            </div>
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity Needed (optional)
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="1000"
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium mb-2">
                Unit (optional)
              </label>
              <input
                id="unit"
                name="unit"
                type="text"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="kg, bags, pieces"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Delivery Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Amsterdam, Netherlands"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Urgency Level *
            </label>
            <div className="grid grid-cols-4 gap-2 p-1 bg-secondary rounded-lg">
              {URGENCY_LEVELS.map(level => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setUrgency(level.value as any)}
                  className={`
                    py-2 px-3 rounded-md font-medium transition-all text-sm
                    ${urgency === level.value
                      ? 'bg-primary text-primary-foreground'
                      : `${level.color} hover:bg-accent`
                    }
                  `}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Matching Info */}
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="text-sm">
                <div className="font-medium text-primary mb-1">AI-Powered Matching</div>
                <div className="text-muted-foreground">
                  Our AI will automatically find matching suppliers and notify both parties when a good match is found.
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 luxury-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post Buy Request'}
            </button>

            <Link
              href="/dashboard"
              className="px-8 py-3 bg-secondary hover:bg-accent border border-border rounded-lg font-semibold transition-all text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
