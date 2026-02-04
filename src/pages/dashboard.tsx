import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/providers/AuthProvider';
import { MainLayout } from '../components/layouts/MainLayout';
import { StatsCard } from '../components/dashboard/StatsCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { ActivityItem } from '../components/dashboard/ActivityItem';
import { AIWidget } from '../components/dashboard/AIWidget';
import { FloatingCallButton } from '../components/dashboard/FloatingCallButton';
import { TransactionItem } from '../components/transactions/TransactionItem';

// Mock data (replace with real data later)
const revenueData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 67000 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    revenue: 67000,
    orders: 45,
    customers: 128,
    growth: 23.5,
  });

  const recentActivities = [
    {
      type: 'order' as const,
      title: 'New order from Amina K.',
      subtitle: '2x Ankara fabric - ₦5,000',
      time: '2 min ago',
      status: 'success' as const,
    },
    {
      type: 'payment' as const,
      title: 'Payment received',
      subtitle: 'M-Pesa transfer - ₦12,000',
      time: '15 min ago',
      status: 'success' as const,
    },
    {
      type: 'message' as const,
      title: 'New message from John D.',
      subtitle: 'Asking about iPhone case availability',
      time: '1 hour ago',
    },
  ];

  const transactions: Array<{
    type: 'received' | 'sent';
    name: string;
    amount: number;
    item: string;
    time: string;
    status: 'completed' | 'pending' | 'failed';
  }> = [
    {
      type: 'received',
      name: 'Amina K.',
      amount: 5000,
      item: '2x Ankara fabric',
      time: '2 min ago',
      status: 'completed',
    },
    {
      type: 'sent',
      name: 'MTN Airtime',
      amount: 1000,
      item: 'Airtime purchase',
      time: '1 hour ago',
      status: 'completed',
    },
    {
      type: 'received',
      name: 'John D.',
      amount: 3500,
      item: 'iPhone case',
      time: '15 min ago',
      status: 'pending',
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>Dashboard - WakilChat</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold neon-text mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'Entrepreneur'}! 🦁
          </h1>
          <p className="text-gray-400">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCard
              title="Revenue"
              value={`₦${stats.revenue.toLocaleString()}`}
              change={stats.growth}
              trend="up"
              icon="💰"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsCard
              title="Orders"
              value={stats.orders.toString()}
              change={12}
              trend="up"
              icon="📦"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsCard
              title="Customers"
              value={stats.customers.toString()}
              change={8}
              trend="up"
              icon="👥"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsCard
              title="Conversion"
              value="34%"
              change={5}
              trend="up"
              icon="📈"
            />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <QuickActions />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold neon-text mb-4">Recent Activity</h2>
            {recentActivities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <ActivityItem {...activity} />
              </motion.div>
            ))}
          </div>

          {/* AI Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <AIWidget />
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold neon-text mb-4">
            Recent Transactions
          </h2>
          {transactions.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <TransactionItem {...tx} />
            </motion.div>
          ))}
        </div>
      </div>

      <FloatingCallButton />
    </MainLayout>
  );
}