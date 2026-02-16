/**
 * Ethio Telecom VAS Carrier Billing Integration
 * Allows Ethiopian users to pay via mobile phone bill
 */

export interface SubscriptionPlan {
  id: string
  name: string
  priceETB: number
  features: string[]
  billingCycle: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    priceETB: 0,
    features: [
      '5 translations/day',
      '1 product listing',
      'Basic chat',
      'Community access',
    ],
    billingCycle: 'MONTHLY',
  },
  {
    id: 'starter',
    name: 'Starter',
    priceETB: 999,
    features: [
      '100 translations/day',
      '5 product listings',
      'Basic documents',
      'AI matching',
      'Email support',
    ],
    billingCycle: 'MONTHLY',
  },
  {
    id: 'professional',
    name: 'Professional',
    priceETB: 2999,
    features: [
      'Unlimited translations',
      '50 product listings',
      'Full document suite',
      'Priority AI matching',
      'Video calls',
      'Priority support',
    ],
    billingCycle: 'MONTHLY',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceETB: 7999,
    features: [
      'Everything in Professional',
      'Unlimited listings',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'Advanced analytics',
    ],
    billingCycle: 'MONTHLY',
  },
]

/**
 * Calculate net revenue after Ethio Telecom takes their cut
 * Ethio Telecom typically takes ~55% of carrier billing revenue
 */
export function calculateNetRevenue(grossAmount: number): {
  gross: number
  ethioTelecomFee: number
  net: number
  feePercentage: number
} {
  const feePercentage = 55 // 55% goes to Ethio Telecom
  const ethioTelecomFee = grossAmount * (feePercentage / 100)
  const net = grossAmount - ethioTelecomFee

  return {
    gross: grossAmount,
    ethioTelecomFee: Math.round(ethioTelecomFee),
    net: Math.round(net),
    feePercentage,
  }
}

/**
 * Mock Ethio Telecom VAS API
 * In production, this would integrate with actual Ethio Telecom VAS gateway
 */
export class EthioTelecomBilling {
  private apiUrl: string
  private merchantId: string
  private apiKey: string

  constructor() {
    this.apiUrl = process.env.ETHIO_TELECOM_API_URL || 'https://vas-api.ethiotelecom.et'
    this.merchantId = process.env.ETHIO_TELECOM_MERCHANT_ID || 'WAKILCHAT_TEST'
    this.apiKey = process.env.ETHIO_TELECOM_API_KEY || ''
  }

  /**
   * Initiate subscription via carrier billing
   */
  async initiateSubscription(data: {
    phoneNumber: string
    planId: string
    userId: string
  }): Promise<{
    success: boolean
    transactionId?: string
    confirmationCode?: string
    error?: string
  }> {
    // In production, this would call Ethio Telecom VAS API
    // For now, return mock response
    
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === data.planId)
    if (!plan || plan.id === 'free') {
      return {
        success: false,
        error: 'Invalid plan selected',
      }
    }

    // Mock successful response
    return {
      success: true,
      transactionId: `ET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      confirmationCode: Math.random().toString().substr(2, 6),
    }
  }

  /**
   * Verify subscription status
   */
  async verifySubscription(transactionId: string): Promise<{
    status: 'pending' | 'confirmed' | 'failed'
    amount?: number
    timestamp?: Date
  }> {
    // Mock verification
    return {
      status: 'confirmed',
      amount: 999,
      timestamp: new Date(),
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<{
    success: boolean
    error?: string
  }> {
    return {
      success: true,
    }
  }

  /**
   * Get subscriber balance (if API provides this)
   */
  async getSubscriberBalance(phoneNumber: string): Promise<{
    balance: number
    currency: string
  }> {
    // Mock balance check
    return {
      balance: 5000,
      currency: 'ETB',
    }
  }
}

/**
 * Send SMS confirmation (via Ethio Telecom SMS API)
 */
export async function sendSubscriptionSMS(
  phoneNumber: string,
  message: string
): Promise<boolean> {
  // In production, integrate with Ethio Telecom SMS gateway
  console.log(`SMS to ${phoneNumber}: ${message}`)
  return true
}
