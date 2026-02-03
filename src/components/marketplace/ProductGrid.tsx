import Image from 'next/image';
import { Card } from '../../lib/components/Card';
import { Badge } from '../../lib/components/Badge';
import { Button } from '../../lib/components/Button';

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  seller: {
    name: string;
    rating: number;
    location: string;
  };
  isNegotiable: boolean;
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onContactSeller: (productId: string) => void;
}

export function ProductGrid({
  products,
  loading,
  onLoadMore,
  hasMore,
  onContactSeller,
}: ProductGridProps) {
  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-800 rounded-lg mb-4" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-800 rounded w-3/4" />
              <div className="h-6 bg-gray-800 rounded w-1/2" />
              <div className="h-4 bg-gray-800 rounded w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-white mb-2">No Products Found</h2>
        <p className="text-gray-400">
          Try adjusting your filters or search terms
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} hover className="group">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-medium mb-2 truncate">
                {product.title}
              </h3>
              
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold text-white">
                  {product.currency} {product.price.toLocaleString()}
                </div>
                {product.isNegotiable && (
                  <Badge variant="purple" size="sm">
                    Negotiable
                  </Badge>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  {product.seller.rating.toFixed(1)}
                  <span className="mx-2">•</span>
                  {product.seller.name}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="mr-1">📍</span>
                  {product.seller.location}
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                onClick={() => onContactSeller(product.id)}
              >
                Contact Seller
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={onLoadMore}
            isLoading={loading}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}