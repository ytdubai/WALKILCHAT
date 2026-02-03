import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '../../lib/components/Card';
import { Badge } from '../../lib/components/Badge';
import { Button } from '../../lib/components/Button';

interface OrderCardProps {
  order: {
    id: string;
    orderNumber: string;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
    total: number;
    currency: string;
    items: Array<{
      id: string;
      title: string;
      quantity: number;
      price: number;
      image: string;
    }>;
    buyer: {
      name: string;
      image?: string;
    };
    notes?: string;
    paymentMethod: string;
  };
}

export function OrderCard({ order }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    pending: 'warning',
    completed: 'success',
    cancelled: 'error',
  } as const;

  return (
    <Card className={`transition-all ${expanded ? 'ring-2 ring-purple-500' : ''}`}>
      {/* Order Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <div>
          <div className="text-sm text-gray-400">Order #{order.orderNumber}</div>
          <div className="text-white font-medium">
            {formatDistanceToNow(order.createdAt, { addSuffix: true })}
          </div>
        </div>
        <Badge variant={statusColors[order.status]} size="sm">
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      {/* Order Summary */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
              {order.buyer.image ? (
                <Image
                  src={order.buyer.image}
                  alt={order.buyer.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {order.buyer.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-white font-medium">{order.buyer.name}</div>
              <div className="text-sm text-gray-400">
                {order.items.length} items • {order.currency}{' '}
                {order.total.toLocaleString()}
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less' : 'View Details'}
          </Button>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            {/* Items */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Items</h4>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-white">{item.title}</div>
                      <div className="text-sm text-gray-400">
                        {item.quantity} × {order.currency}{' '}
                        {item.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-white font-medium">
                      {order.currency}{' '}
                      {(item.quantity * item.price).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">
                Payment Details
              </h4>
              <div className="bg-gray-800 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-white">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="text-white font-medium">
                    {order.currency} {order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Notes</h4>
                <div className="text-white text-sm">{order.notes}</div>
              </div>
            )}

            {/* Actions */}
            {order.status === 'pending' && (
              <div className="flex gap-3">
                <Button variant="secondary" fullWidth>
                  Cancel Order
                </Button>
                <Button fullWidth>Mark as Completed</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}