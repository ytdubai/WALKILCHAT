import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/providers/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Input } from '../../lib/components/Input';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, price: 0 },
  ]);
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    dueDate: '',
    notes: '',
    sendVia: [] as string[],
  });

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Add tax or other calculations here if needed
    return subtotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([
          {
            user_id: user?.id,
            customer_name: form.customerName,
            customer_email: form.customerEmail,
            customer_phone: form.customerPhone,
            due_date: form.dueDate,
            total_amount: calculateTotal(),
            status: 'pending',
            notes: form.notes,
          },
        ])
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Add invoice items
      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(
          items.map((item) => ({
            invoice_id: invoice.id,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
          }))
        );

      if (itemsError) throw itemsError;

      // Send notifications based on form.sendVia
      if (form.sendVia.includes('whatsapp')) {
        // TODO: Implement WhatsApp sending
      }
      if (form.sendVia.includes('email')) {
        // TODO: Implement email sending
      }

      router.push('/invoices');
    } catch (err) {
      console.error('Error creating invoice:', err);
      alert('Failed to create invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSendVia = (method: string) => {
    setForm((prev) => ({
      ...prev,
      sendVia: prev.sendVia.includes(method)
        ? prev.sendVia.filter((m) => m !== method)
        : [...prev.sendVia, method],
    }));
  };

  return (
    <>
      <Head>
        <title>Create Invoice - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Create New Invoice</h1>
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
                <Input
                  label="Customer Email"
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                />
                <Input
                  label="Due Date"
                  type="date"
                  required
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
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
                          label="Description"
                          required
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
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
                  placeholder="Additional notes or payment instructions..."
                />
              </div>

              {/* Send Via */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Send Invoice Via
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                      checked={form.sendVia.includes('whatsapp')}
                      onChange={() => toggleSendVia('whatsapp')}
                    />
                    <span className="ml-2 text-white">WhatsApp</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                      checked={form.sendVia.includes('email')}
                      onChange={() => toggleSendVia('email')}
                    />
                    <span className="ml-2 text-white">Email</span>
                  </label>
                </div>
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
                  Create & Send Invoice
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}