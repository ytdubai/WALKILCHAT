import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/providers/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Input } from '../../lib/components/Input';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([{ name: '', quantity: 1, price: 0 }]);
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    paymentMethod: 'cash',
    notes: '',
  });

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id,
            customer_name: form.customerName,
            customer_phone: form.customerPhone,
            payment_method: form.paymentMethod,
            total_amount: calculateTotal(),
            status: 'pending',
            notes: form.notes,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Add order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          items.map((item) => ({
            order_id: order.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))
        );

      if (itemsError) throw itemsError;

      router.push('/orders');
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>New Sale - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Record New Sale</h1>
            <Button
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Customer Name"
                  required
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                />
                <Input
                  label="Customer Phone"
                  value={form.customerPhone}
                  onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                />
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">Items</h2>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={addItem}
                  >
                    Add Item
                  </Button>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="grid md:grid-cols-4 gap-4 items-end">
                      <div className="md:col-span-2">
                        <Input
                          label="Item Name"
                          required
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                        />
                      </div>
                      <Input
                        type="number"
                        label="Quantity"
                        min="1"
                        required
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                      />
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          label="Price"
                          min="0"
                          step="0.01"
                          required
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                        />
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="mb-0.5 text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Payment Method
                </label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="cash">Cash</option>
                  <option value="mpesa">M-Pesa</option>
                  <option value="telebirr">Telebirr</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Total */}
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-300">Total Amount:</span>
                  <span className="text-2xl font-bold text-white">
                    ₦{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                >
                  Complete Sale
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}