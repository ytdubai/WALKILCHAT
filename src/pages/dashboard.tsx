import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../lib/providers/AuthProvider';
import { StatsCard } from '../components/dashboard/StatsCard';
import { QuickAction } from '../components/dashboard/QuickAction';
import { ActivityItem } from '../components/dashboard/ActivityItem';
import { AIWidget } from '../components/dashboard/AIWidget';
import { supabase } from '../lib/supabase';

interface StatsData {
  totalSales: number;
  pendingOrders: number;
  totalCustomers: number;
  monthlyRevenue: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsData>({
    totalSales: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    monthlyRevenue: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
      subscribeToUpdates();
    }
  }, [user]);

  const loadDashboardData = async () => {
    // TODO: Replace with real API calls
    setStats({
      totalSales: 45000,
      pendingOrders: 3,
      totalCustomers: 156,
      monthlyRevenue: 1234000
    });

    setRecentActivity([
      {
        type: 'payment',
        title: 'paid for 2x Ankara fabric',
        amount: '₦5,000',
        time: new Date(Date.now() - 1000 * 60 * 2),
        status: 'completed',
        userName: 'Amina K.'
      },
      {
        type: 'order',
        title: 'ordered iPhone case',
        amount: '₦3,500',
        time: new Date(Date.now() - 1000 * 60 * 15),
        status: 'pending',
        userName: 'John D.'
      }
    ]);

    setLoading(false);
  };

  const subscribeToUpdates = () => {
    const subscription = supabase
      .channel('dashboard')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        () => {
          loadDashboardData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard - WakilChat</title>
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl">👋</span>
              <div>
                <h1 className="text-white font-medium">Welcome back!</h1>
                <p className="text-sm text-gray-400">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon="💰"
              label="Today's Sales"
              value={`₦${stats.totalSales.toLocaleString()}`}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              icon="📦"
              label="Pending Orders"
              value={stats.pendingOrders}
            />
            <StatsCard
              icon="👥"
              label="Total Customers"
              value={stats.totalCustomers}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              icon="📈"
              label="This Month"
              value={`₦${stats.monthlyRevenue.toLocaleString()}`}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-white font-medium mb-4">Quick Actions</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <QuickAction
                icon="➕"
                label="New Sale"
                href="/shop/new-sale"
              />
              <QuickAction
                icon="📤"
                label="Send Invoice"
                href="/shop/invoice"
              />
              <QuickAction
                icon="📢"
                label="Message Customers"
                href="/messages"
              />
              <QuickAction
                icon="➕"
                label="Add Product"
                href="/shop/add"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="md:col-span-2 space-y-4">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>

            {/* AI Widget */}
            <div>
              <AIWidget
                stats={{
                  messagesHandled: 12,
                  paymentReminders: 3,
                  customersHelped: 8,
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}