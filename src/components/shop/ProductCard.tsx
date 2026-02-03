import Image from 'next/image';
import { Card } from '../../lib/components/Card';
import { Badge } from '../../lib/components/Badge';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  stock: number;
  isNegotiable: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({
  id,
  title,
  price,
  currency,
  images,
  stock,
  isNegotiable,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <Card hover className="group">
      {/* Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <Image
          src={images[0] || '/placeholder-product.jpg'}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
            <span className="text-white font-medium">Sold Out</span>
          </div>
        )}
        
        {/* Edit/Delete Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(id)}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(id)}
            className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-medium mb-2 truncate">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">
              {currency} {price.toLocaleString()}
            </span>
            {isNegotiable && (
              <Badge variant="purple" size="sm">
                Negotiable
              </Badge>
            )}
          </div>
          <Badge
            variant={stock > 0 ? 'success' : 'error'}
            size="sm"
          >
            {stock} in stock
          </Badge>
        </div>
      </div>
    </Card>
  );
}