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

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      price: parseFloat(formData.get('price') as string),
      quantity: parseInt(formData.get('quantity') as string),
      unit: formData.get('unit') as string,
      location: formData.get('location') as string,
      minOrderQty: formData.get('minOrderQty') ? parseInt(formData.get('minOrderQty') as string) : undefined,
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create product')
      }

      const product = await response.json()
      router.push(`/dashboard/products/${product.id}`)
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
          <h1 className="text-3xl font-bold mb-2">List a Product</h1>
          <p className="text-muted-foreground">
            Create a new product listing to reach buyers
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
              Product Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Ethiopian Yirgacheffe Coffee - Grade 1"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Detailed description of your product, including quality, origin, certifications..."
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

          {/* Price & Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Price (per unit) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="1500"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium mb-2">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="ETB">ETB (Ethiopian Birr)</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Available Quantity *
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="1000"
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium mb-2">
                Unit *
              </label>
              <input
                id="unit"
                name="unit"
                type="text"
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="kg, bags, pieces, etc."
              />
            </div>
          </div>

          {/* Minimum Order */}
          <div>
            <label htmlFor="minOrderQty" className="block text-sm font-medium mb-2">
              Minimum Order Quantity (optional)
            </label>
            <input
              id="minOrderQty"
              name="minOrderQty"
              type="number"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="100"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Addis Ababa, Ethiopia"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 luxury-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Listing'}
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
