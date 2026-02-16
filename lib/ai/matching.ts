import { prisma } from '@/lib/prisma'

/**
 * AI Matching Algorithm
 * Matches buy requests with products based on multiple factors
 */

export async function matchBuyRequestWithProducts(buyRequestId: string) {
  const buyRequest = await prisma.buyRequest.findUnique({
    where: { id: buyRequestId },
    include: { user: true },
  })

  if (!buyRequest || buyRequest.status !== 'ACTIVE') {
    return []
  }

  // Find matching products
  const matchingProducts = await prisma.product.findMany({
    where: {
      status: 'ACTIVE',
      category: buyRequest.category,
      userId: { not: buyRequest.userId }, // Don't match with own products
    },
    include: {
      user: true,
    },
  })

  const matches = []

  for (const product of matchingProducts) {
    const score = calculateMatchScore(buyRequest, product)
    
    if (score >= 50) { // Minimum threshold
      const match = await prisma.match.create({
        data: {
          buyRequestId: buyRequest.id,
          productId: product.id,
          buyerId: buyRequest.userId,
          sellerId: product.userId,
          aiScore: score,
          matchReason: generateMatchReason(buyRequest, product, score),
          status: 'PENDING',
        },
        include: {
          product: {
            include: { user: true },
          },
          buyRequest: {
            include: { user: true },
          },
        },
      })

      matches.push(match)

      // Create notifications for both parties
      await createMatchNotifications(match)
    }
  }

  return matches
}

/**
 * Calculate match score (0-100)
 */
function calculateMatchScore(
  buyRequest: any,
  product: any
): number {
  let score = 0

  // Category match (mandatory - already filtered)
  score += 40

  // Price match (if budget specified)
  if (buyRequest.maxBudget) {
    if (product.price <= buyRequest.maxBudget) {
      score += 20
    } else if (product.price <= buyRequest.maxBudget * 1.2) {
      // Within 20% tolerance
      score += 10
    }
  } else {
    score += 15 // No budget constraint
  }

  // Quantity match (if specified)
  if (buyRequest.quantity && product.quantity) {
    if (product.quantity >= buyRequest.quantity) {
      score += 15
    } else if (product.quantity >= buyRequest.quantity * 0.5) {
      // At least 50% available
      score += 8
    }
  } else {
    score += 10 // No quantity constraint
  }

  // Text similarity (title + description)
  const textScore = calculateTextSimilarity(
    `${buyRequest.title} ${buyRequest.description}`.toLowerCase(),
    `${product.title} ${product.description}`.toLowerCase()
  )
  score += textScore * 15

  // Seller verification bonus
  if (product.user.isVerified) {
    score += 5
  }

  // Urgency factor
  if (buyRequest.urgency === 'URGENT' && product.quantity > 0) {
    score += 5
  }

  return Math.min(Math.round(score), 100)
}

/**
 * Simple text similarity using keyword overlap
 */
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(/\s+/).filter(w => w.length > 3))
  const words2 = new Set(text2.split(/\s+/).filter(w => w.length > 3))
  
  let matches = 0
  for (const word of words1) {
    if (words2.has(word)) {
      matches++
    }
  }

  const total = Math.max(words1.size, words2.size)
  return total > 0 ? matches / total : 0
}

/**
 * Generate human-readable match reason
 */
function generateMatchReason(
  buyRequest: any,
  product: any,
  score: number
): string {
  const reasons = []

  reasons.push(`${product.title} matches your ${buyRequest.category.replace(/_/g, ' ').toLowerCase()} requirement`)

  if (buyRequest.maxBudget && product.price <= buyRequest.maxBudget) {
    reasons.push(`Price (${product.price} ${product.currency}) is within your budget`)
  }

  if (buyRequest.quantity && product.quantity >= buyRequest.quantity) {
    reasons.push(`Sufficient quantity available (${product.quantity} ${product.unit})`)
  }

  if (product.user.isVerified) {
    reasons.push('Verified seller')
  }

  if (score >= 80) {
    return `Excellent match! ${reasons.join('. ')}.`
  } else if (score >= 65) {
    return `Good match. ${reasons.join('. ')}.`
  } else {
    return `Potential match. ${reasons.join('. ')}.`
  }
}

/**
 * Create notifications for match
 */
async function createMatchNotifications(match: any) {
  // Notify buyer
  await prisma.notification.create({
    data: {
      userId: match.buyerId,
      type: 'NEW_MATCH',
      title: 'New Match Found!',
      titleAm: 'አዲስ ተዛማጅ ተገኝቷል!',
      message: `We found a match for your request: ${match.buyRequest.title}`,
      messageAm: `ለጥያቄዎ ተዛማጅ አግኝተናል: ${match.buyRequest.titleAm || match.buyRequest.title}`,
      actionUrl: `/dashboard/matches/${match.id}`,
      metadata: { matchId: match.id, score: match.aiScore },
    },
  })

  // Notify seller
  await prisma.notification.create({
    data: {
      userId: match.sellerId,
      type: 'NEW_MATCH',
      title: 'New Buyer Match!',
      titleAm: 'አዲስ ገዢ ተገኝቷል!',
      message: `A buyer is interested in: ${match.product.title}`,
      messageAm: `ገዢ ፍላጎት አለው: ${match.product.titleAm || match.product.title}`,
      actionUrl: `/dashboard/matches/${match.id}`,
      metadata: { matchId: match.id, score: match.aiScore },
    },
  })
}

/**
 * Manually trigger matching for existing buy request
 */
export async function triggerMatching(buyRequestId: string) {
  return await matchBuyRequestWithProducts(buyRequestId)
}

/**
 * Re-run matching for all active buy requests
 * (Run periodically via cron or after new product is added)
 */
export async function matchAllActiveBuyRequests() {
  const activeBuyRequests = await prisma.buyRequest.findMany({
    where: { status: 'ACTIVE' },
    select: { id: true },
  })

  const results = []
  for (const request of activeBuyRequests) {
    const matches = await matchBuyRequestWithProducts(request.id)
    results.push({ buyRequestId: request.id, matchesFound: matches.length })
  }

  return results
}
