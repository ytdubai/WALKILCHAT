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
import { demoStats, demoTransactions, demoRevenueData } from '../lib/demoData';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(demoStats);

  const recentActivities = [
    {
      type: 'order' as const,
      title: 'New order from Chidi A.',
      subtitle: '3x Ankara fabric - ₦16,500',
      time: '2 hours ago',
      status: 'success' as const,
    },
    {
      type: 'payment' as const,
      title: 'Payment received',
      subtitle: 'M-Pesa transfer - ₦850,000',
      time: '3 hours ago',
      status: 'success' as const,
    },
    {
      type: 'message' as const,
      title: 'New message from Funke O.',
      subtitle: 'Asking about iPhone availability',
      time: '5 hours ago',
    },
    {
      type: 'order' as const,
      title: 'Order completed',
      subtitle: 'Palm oil delivery confirmed',
      time: '1 day ago',
      status: 'success' as const,
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>Dashboard - WakilChat™</title>
      </Head>

      <div style={{ padding: '2rem', minHeight: '100vh', background: '#0a0a0a' }}>
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            Welcome back, {user?.user_metadata?.full_name || 'Amina'}! 🦁
          </h1>
          <p style={{ color: '#999', fontSize: '1.125rem' }}>
            Here's what's happening with your business today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCard
              title="Total Revenue"
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
              change={23}
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
              change={15}
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
              title="Avg Order Value"
              value={`₦${stats.avgOrderValue.toLocaleString()}`}
              change={8}
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
          style={{ marginBottom: '2rem' }}
        >
          <QuickActions />
        </motion.div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Recent Activity */}
          <div style={{ gridColumn: 'span 2' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Recent Activity</span>
              <span style={{
                background: 'rgba(255,215,0,0.2)',
                color: '#FFD700',
                fontSize: '0.75rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '50px'
              }}>
                Live
              </span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentActivities.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <ActivityItem {...activity} />
                </motion.div>
              ))}
            </div>
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
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1.5rem'
          }}>
            Recent Transactions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {demoTransactions.slice(0, 5).map((tx, i) => (
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
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link
              href="/payments"
              style={{
                display: 'inline-block',
                color: '#FFD700',
                fontWeight: '600',
                padding: '0.75rem 1.5rem',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '50px',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}
            >
              View All Transactions →
            </Link>
          </div>
        </div>
      </div>

      <FloatingCallButton />
    </MainLayout>
  );
}