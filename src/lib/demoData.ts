// Demo Data for Investor Presentations
// Login: demo@wakilchat.com / Password: DemoWakil2026!

export const demoUser = {
  id: 'demo-user-001',
  email: 'demo@wakilchat.com',
  full_name: 'Amina Okonkwo',
  phone: '+234 803 555 1234',
  business_name: "Amina's Premium Fabrics",
  avatar_url: '/branding/logo-icon.jpg',
  created_at: '2025-09-15T10:00:00Z',
  total_sales: 2450000,
  total_orders: 156,
  rating: 4.9,
  verified: true
};

export const demoProducts = [
  {
    id: 'prod-001',
    title: 'Premium Ankara Fabric - Blue & Gold',
    price: 5500,
    currency: '₦',
    images: ['/demo/ankara-blue.jpg'],
    stock: 45,
    isNegotiable: true,
    category: 'Fashion',
    description: 'High-quality Ankara fabric, 6 yards. Perfect for events.',
    sold: 89
  },
  {
    id: 'prod-002',
    title: 'iPhone 15 Pro Max - 256GB',
    price: 850000,
    currency: '₦',
    images: ['/demo/iphone15.jpg'],
    stock: 12,
    isNegotiable: false,
    category: 'Electronics',
    description: 'Brand new, sealed. International warranty.',
    sold: 24
  },
  {
    id: 'prod-003',
    title: 'Premium Palm Oil - 5 Liters',
    price: 12000,
    currency: '₦',
    images: ['/demo/palm-oil.jpg'],
    stock: 200,
    isNegotiable: true,
    category: 'Food',
    description: 'Pure, organic palm oil. Direct from farm.',
    sold: 456
  },
  // Add 12 more products...
];

export const demoOrders = [
  {
    id: 'order-001',
    orderNumber: 'WK-2024-001',
    status: 'completed',
    createdAt: new Date('2026-02-01T14:30:00Z'),
    total: 16500,
    currency: '₦',
    items: [
      {
        id: 'item-001',
        title: 'Ankara Fabric - Blue & Gold',
        quantity: 3,
        price: 5500,
        image: '/demo/ankara-blue.jpg'
      }
    ],
    buyer: {
      name: 'Chidi Adebayo',
      image: null
    },
    paymentMethod: 'M-Pesa',
    notes: 'Please ship before Friday'
  },
  {
    id: 'order-002',
    orderNumber: 'WK-2024-002',
    status: 'pending',
    createdAt: new Date('2026-02-04T09:15:00Z'),
    total: 850000,
    currency: '₦',
    items: [
      {
        id: 'item-002',
        title: 'iPhone 15 Pro Max - 256GB',
        quantity: 1,
        price: 850000,
        image: '/demo/iphone15.jpg'
      }
    ],
    buyer: {
      name: 'Funke Olamide',
      image: null
    },
    paymentMethod: 'Card',
    notes: 'Need by Monday'
  },
  // Add 23 more orders...
];

export const demoTransactions = [
  {
    type: 'received' as const,
    name: 'Chidi A.',
    amount: 16500,
    item: '3x Ankara fabric',
    time: '2 hours ago',
    status: 'completed' as const
  },
  {
    type: 'sent' as const,
    name: 'MTN Airtime',
    amount: 5000,
    item: 'Bulk airtime purchase',
    time: '1 day ago',
    status: 'completed' as const
  },
  {
    type: 'received' as const,
    name: 'Funke O.',
    amount: 850000,
    item: 'iPhone 15 Pro Max',
    time: '3 hours ago',
    status: 'pending' as const
  },
  // Add more...
];

export const demoMessages = [
  {
    id: 'msg-001',
    from: 'Chidi Adebayo',
    message: 'Hi! Do you have the blue Ankara fabric in stock?',
    time: '10:30 AM',
    unread: false
  },
  {
    id: 'msg-002',
    from: 'Funke Olamide',
    message: 'Can I get discount if I buy 2 iPhones?',
    time: '2:15 PM',
    unread: true
  },
  // Add more...
];

export const demoRevenueData = [
  { month: 'Sep', amount: 145000 },
  { month: 'Oct', amount: 289000 },
  { month: 'Nov', amount: 421000 },
  { month: 'Dec', amount: 678000 },
  { month: 'Jan', amount: 1150000 },
  { month: 'Feb', amount: 2450000 }
];

export const demoStats = {
  revenue: 2450000,
  orders: 156,
  customers: 89,
  growth: 113, // 113% growth vs last month
  avgOrderValue: 15705,
  conversionRate: 34,
  repeatCustomers: 67
};