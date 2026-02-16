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

type Product = {
  id: string
  title: string
  description: string
  category: string
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
  createdAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      if (search) params.set('search', search)

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProducts()
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
            href="/dashboard/products/new"
            className="luxury-button-sm"
          >
            + List Product
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Marketplace</h1>
          <p className="text-muted-foreground">
            Browse products from Ethiopian exporters
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
              placeholder="Search products..."
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

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No products found
            </div>
            <Link
              href="/dashboard/products/new"
              className="inline-block luxury-button"
            >
              List the First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Link
                key={product.id}
                href={`/dashboard/products/${product.id}`}
                className="luxury-card p-6 hover:border-primary/50 transition-all group"
              >
                {/* Product Image Placeholder */}
                <div className="w-full h-48 bg-secondary rounded-lg mb-4 flex items-center justify-center">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>

                {/* Product Info */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {product.currency}/{product.unit}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {product.location}
                  </div>

                  {product.user.isVerified && (
                    <div className="flex items-center gap-1 text-primary">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                {/* Seller */}
                <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  {product.user.businessName || `${product.user.firstName} ${product.user.lastName}`}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
