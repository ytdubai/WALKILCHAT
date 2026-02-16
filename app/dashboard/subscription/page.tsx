'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SUBSCRIPTION_PLANS, calculateNetRevenue } from '@/lib/billing/ethio-telecom'

export default function SubscriptionPage() {
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions')
      const data = await response.json()
      setCurrentSubscription(data.subscription)
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (planId: string) => {
    const phoneNumber = prompt('Enter your Ethiopian phone number (e.g., +2519XXXXXXXX):')
    if (!phoneNumber) return

    setSubscribing(planId)
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          phoneNumber,
          billingCycle: 'MONTHLY',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Subscription failed')
      }

      const data = await response.json()
      alert(`Subscription successful! Confirmation code: ${data.payment.confirmationCode}`)
      await fetchSubscription()
    } catch (error: any) {
      alert(`Subscription failed: ${error.message}`)
    } finally {
      setSubscribing(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-gradient">
            WakilChat™
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Pay conveniently via Ethio Telecom carrier billing
          </p>
          <p className="text-sm text-muted-foreground">
            No credit card needed • Charged to your phone bill • Cancel anytime
          </p>
        </div>

        {/* Current Subscription */}
        {currentSubscription && (
          <div className="luxury-card p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Active Plan</div>
                <div className="text-2xl font-bold text-primary">
                  {SUBSCRIPTION_PLANS.find(p => p.id === currentSubscription.plan.toLowerCase())?.name || currentSubscription.plan}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Next billing</div>
                <div className="font-semibold">
                  {new Date(currentSubscription.renewalDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const revenue = calculateNetRevenue(plan.priceETB)
            const isCurrent = currentSubscription?.plan.toLowerCase() === plan.id
            const isFree = plan.id === 'free'

            return (
              <div
                key={plan.id}
                className={`luxury-card p-8 flex flex-col ${
                  isCurrent ? 'border-primary border-2' : ''
                }`}
              >
                {isCurrent && (
                  <div className="mb-4 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium text-center">
                    Current Plan
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {plan.priceETB === 0 ? 'Free' : `${plan.priceETB.toLocaleString()} ETB`}
                  </div>
                  {plan.priceETB > 0 && (
                    <div className="text-xs text-muted-foreground">per month</div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {!isFree && plan.priceETB > 0 && (
                  <div className="text-xs text-muted-foreground mb-4 p-3 bg-secondary rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span>Gross:</span>
                      <span>{revenue.gross} ETB</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Ethio Telecom fee:</span>
                      <span>-{revenue.ethioTelecomFee} ETB</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-border pt-1 mt-1">
                      <span>Net revenue:</span>
                      <span className="text-primary">{revenue.net} ETB</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => !isFree && handleSubscribe(plan.id)}
                  disabled={isCurrent || isFree || subscribing !== null}
                  className={`
                    w-full py-3 rounded-lg font-semibold transition-all
                    ${isCurrent
                      ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                      : isFree
                      ? 'bg-secondary text-foreground'
                      : 'luxury-button'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {subscribing === plan.id ? 'Processing...' : isCurrent ? 'Current Plan' : isFree ? 'Free Forever' : 'Subscribe Now'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Payment Info */}
        <div className="mt-12 max-w-3xl mx-auto luxury-card p-8">
          <h2 className="text-xl font-bold mb-4">How Carrier Billing Works</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Select Your Plan</div>
                <div>Choose the subscription that fits your business needs</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Enter Phone Number</div>
                <div>Provide your Ethio Telecom mobile number</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Confirm via SMS</div>
                <div>You'll receive an SMS with a confirmation code</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Start Trading</div>
                <div>Your subscription is active immediately after confirmation</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-sm">
              <strong>Note:</strong> Payments are processed through Ethio Telecom's secure VAS gateway. 
              Charges appear on your monthly phone bill. Cancel anytime without fees.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
