'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 5) {
      setError('Maximum 5 images allowed')
      return
    }

    setImages(prev => [...prev, ...files])
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return []

    const supabase = createClient()
    const uploadedUrls: string[] = []

    for (let i = 0; i < images.length; i++) {
      const file = images[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `products/${fileName}`

      setUploadProgress(((i + 1) / images.length) * 100)

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (error) {
        console.error('Upload error:', error)
        throw new Error(`Failed to upload image: ${file.name}`)
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      uploadedUrls.push(urlData.publicUrl)
    }

    return uploadedUrls
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Upload images first
      let imageUrls: string[] = []
      if (images.length > 0) {
        imageUrls = await uploadImages()
      }

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
        currency: formData.get('currency') as string || 'ETB',
        images: imageUrls,
      }

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
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Images (Max 5)
            </label>
            
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length < 5 && (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-sm text-muted-foreground">
                    Click to upload images or drag and drop
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB each
                  </div>
                </label>
              </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Uploading images...</span>
                  <span className="text-primary">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

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
              {loading ? (uploadProgress > 0 ? 'Uploading...' : 'Creating...') : 'Create Listing'}
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
