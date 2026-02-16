-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUYER', 'SELLER', 'BOTH');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('AGRICULTURAL_PRODUCTS', 'LIVESTOCK', 'MACHINERY_EQUIPMENT', 'CONSTRUCTION_MATERIALS', 'TEXTILES_CLOTHING', 'FOOD_BEVERAGES', 'TECHNOLOGY_ELECTRONICS', 'AUTOMOTIVE', 'REAL_ESTATE', 'SERVICES', 'OTHER');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'SOLD', 'EXPIRED', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "BuyRequestStatus" AS ENUM ('DRAFT', 'ACTIVE', 'FULFILLED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CONVERTED_TO_DEAL');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('NEGOTIATING', 'AGREEMENT_REACHED', 'PAYMENT_PROCESSING', 'COMPLETED', 'CANCELLED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "DealStage" AS ENUM ('INITIAL_CONTACT', 'PRICE_NEGOTIATION', 'TERMS_DISCUSSION', 'CONTRACT_REVIEW', 'PAYMENT_PENDING', 'DELIVERY_ARRANGED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT', 'LOCATION', 'SYSTEM');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CONTRACT', 'INVOICE', 'RECEIPT', 'ID_DOCUMENT', 'LICENSE', 'CERTIFICATE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CallType" AS ENUM ('VIDEO', 'AUDIO');

-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('INITIATED', 'RINGING', 'ONGOING', 'COMPLETED', 'MISSED', 'REJECTED', 'FAILED');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARRIER_BILLING', 'MOBILE_MONEY', 'BANK_TRANSFER', 'CARD');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_MATCH', 'MESSAGE_RECEIVED', 'DEAL_UPDATE', 'CALL_INCOMING', 'CALL_MISSED', 'DOCUMENT_UPLOADED', 'PAYMENT_RECEIVED', 'SUBSCRIPTION_EXPIRING', 'SYSTEM_ANNOUNCEMENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "businessName" TEXT,
    "avatar" TEXT,
    "bio" TEXT,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
    "role" "UserRole" NOT NULL DEFAULT 'BUYER',
    "accountType" "AccountType" NOT NULL DEFAULT 'FREE',
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "kycStatus" "KYCStatus" NOT NULL DEFAULT 'PENDING',
    "googleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleAm" TEXT,
    "description" TEXT NOT NULL,
    "descriptionAm" TEXT,
    "category" "ProductCategory" NOT NULL,
    "subcategory" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETB',
    "priceNegotiable" BOOLEAN NOT NULL DEFAULT true,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit" TEXT,
    "minOrderQty" INTEGER,
    "images" TEXT[],
    "videos" TEXT[],
    "location" TEXT,
    "region" TEXT,
    "city" TEXT,
    "coordinates" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "aiEnhanced" BOOLEAN NOT NULL DEFAULT false,
    "aiSummary" TEXT,
    "aiTags" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleAm" TEXT,
    "description" TEXT NOT NULL,
    "descriptionAm" TEXT,
    "category" "ProductCategory" NOT NULL,
    "subcategory" TEXT,
    "minBudget" DOUBLE PRECISION,
    "maxBudget" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'ETB',
    "quantity" INTEGER,
    "unit" TEXT,
    "location" TEXT,
    "region" TEXT,
    "city" TEXT,
    "status" "BuyRequestStatus" NOT NULL DEFAULT 'ACTIVE',
    "urgency" "UrgencyLevel" NOT NULL DEFAULT 'NORMAL',
    "aiEnhanced" BOOLEAN NOT NULL DEFAULT false,
    "aiSummary" TEXT,
    "aiTags" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "buyRequestId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "aiScore" DOUBLE PRECISION NOT NULL,
    "matchReason" TEXT,
    "matchReasonAm" TEXT,
    "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
    "sellerViewed" BOOLEAN NOT NULL DEFAULT false,
    "buyerViewed" BOOLEAN NOT NULL DEFAULT false,
    "sellerViewedAt" TIMESTAMP(3),
    "buyerViewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "dealName" TEXT NOT NULL,
    "agreedPrice" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'ETB',
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "status" "DealStatus" NOT NULL DEFAULT 'NEGOTIATING',
    "stage" "DealStage" NOT NULL DEFAULT 'INITIAL_CONTACT',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT,
    "contentType" "MessageType" NOT NULL DEFAULT 'TEXT',
    "mediaUrl" TEXT,
    "mediaType" TEXT,
    "mediaSize" INTEGER,
    "mediaThumbnail" TEXT,
    "originalLang" TEXT,
    "translatedText" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "replyToId" TEXT,
    "systemMessage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiReaction" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "uploaderId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "description" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "initiatorId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "callType" "CallType" NOT NULL DEFAULT 'VIDEO',
    "status" "CallStatus" NOT NULL DEFAULT 'INITIATED',
    "roomId" TEXT,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "quality" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "AccountType" NOT NULL,
    "billingCycle" "BillingCycle" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETB',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "paymentMethod" "PaymentMethod" NOT NULL,
    "transactionId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "renewalDate" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "titleAm" TEXT,
    "message" TEXT NOT NULL,
    "messageAm" TEXT,
    "actionUrl" TEXT,
    "metadata" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_phone_idx" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_accountStatus_idx" ON "User"("accountStatus");

-- CreateIndex
CREATE INDEX "OTP_phone_purpose_idx" ON "OTP"("phone", "purpose");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_status_idx" ON "Product"("status");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");

-- CreateIndex
CREATE INDEX "BuyRequest_userId_idx" ON "BuyRequest"("userId");

-- CreateIndex
CREATE INDEX "BuyRequest_category_idx" ON "BuyRequest"("category");

-- CreateIndex
CREATE INDEX "BuyRequest_status_idx" ON "BuyRequest"("status");

-- CreateIndex
CREATE INDEX "BuyRequest_createdAt_idx" ON "BuyRequest"("createdAt");

-- CreateIndex
CREATE INDEX "Match_productId_idx" ON "Match"("productId");

-- CreateIndex
CREATE INDEX "Match_buyRequestId_idx" ON "Match"("buyRequestId");

-- CreateIndex
CREATE INDEX "Match_sellerId_idx" ON "Match"("sellerId");

-- CreateIndex
CREATE INDEX "Match_buyerId_idx" ON "Match"("buyerId");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE INDEX "Match_createdAt_idx" ON "Match"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_matchId_key" ON "Deal"("matchId");

-- CreateIndex
CREATE INDEX "Deal_buyerId_idx" ON "Deal"("buyerId");

-- CreateIndex
CREATE INDEX "Deal_status_idx" ON "Deal"("status");

-- CreateIndex
CREATE INDEX "Deal_stage_idx" ON "Deal"("stage");

-- CreateIndex
CREATE INDEX "Deal_createdAt_idx" ON "Deal"("createdAt");

-- CreateIndex
CREATE INDEX "Message_dealId_idx" ON "Message"("dealId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

-- CreateIndex
CREATE INDEX "EmojiReaction_messageId_idx" ON "EmojiReaction"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "EmojiReaction_messageId_userId_emoji_key" ON "EmojiReaction"("messageId", "userId", "emoji");

-- CreateIndex
CREATE INDEX "Document_dealId_idx" ON "Document"("dealId");

-- CreateIndex
CREATE INDEX "Document_uploaderId_idx" ON "Document"("uploaderId");

-- CreateIndex
CREATE INDEX "Call_dealId_idx" ON "Call"("dealId");

-- CreateIndex
CREATE INDEX "Call_initiatorId_idx" ON "Call"("initiatorId");

-- CreateIndex
CREATE INDEX "Call_participantId_idx" ON "Call"("participantId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyRequest" ADD CONSTRAINT "BuyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_buyRequestId_fkey" FOREIGN KEY ("buyRequestId") REFERENCES "BuyRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiReaction" ADD CONSTRAINT "EmojiReaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiReaction" ADD CONSTRAINT "EmojiReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
