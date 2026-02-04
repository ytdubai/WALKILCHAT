import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  seller: {
    name: string;
    rating: number;
  };
  isNegotiable: boolean;
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => Promise<void>;
  onContactSeller?: (productId: string) => void;
}

export function ProductGrid({ 
  products, 
  loading = false,
  hasMore = false,
  onLoadMore,
  onContactSeller 
}: ProductGridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} hover className="cursor-pointer">
            <Link href={`/marketplace/${product.id}`}>
              <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <h3 className="text-white font-medium text-sm mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-white">
                    {product.currency} {product.price.toLocaleString()}
                  </span>
                  {product.isNegotiable && (
                    <span className="status-tag text-purple-400 bg-purple-500/20 border-purple-500/30 text-xs">
                      Negotiable
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{product.seller.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    {product.seller.rating}
                  </span>
                </div>
              </div>
            </Link>
            {onContactSeller && (
              <div className="p-3 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onContactSeller(product.id)}
                >
                  Contact Seller
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Load More */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
          >
            Load More Products
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && products.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-white/5 rounded-lg mb-3" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-white/5 rounded" />
                <div className="h-6 bg-white/5 rounded w-2/3" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        </Card>
      )}
    </div>
  );
}