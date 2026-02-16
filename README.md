# WakilChat™ - Africa's Voice, Amplified

**Patent Pending | Registered Trademark**

> The first AI-powered trade communication platform built specifically for African exporters and international buyers.

## 🎯 What is WakilChat?

WakilChat eliminates the **language barrier** and **middleman tax** that costs Ethiopian exporters 10-30% of every deal. 

**The Problem:**
- Ethiopian coffee exporters speak Amharic
- International buyers speak English, Arabic, Mandarin
- Communication requires expensive brokers ($15,000 per deal)
- 70M+ Ethiopians can't pay with credit cards

**Our Solution:**
- Real-time AI translation (Amharic ↔ English)
- Smart AI matching (connects exporters with compatible buyers)
- Video/voice calls (face-to-face negotiation)
- AI document generation (invoices, contracts, packing lists)
- Ethio Telecom carrier billing (pay from phone bill)

## 🚀 Features

### ✅ Phase 1 MVP (Complete - 90%)

**Core Platform:**
- [x] User authentication (email, phone OTP, Google OAuth)
- [x] Product marketplace (list, browse, search, image upload)
- [x] Buy request board (importers post what they need)
- [x] AI matching algorithm (0-100 score, category/price/location)
- [x] Accept/reject match flow
- [x] Real-time chat (Socket.io with typing indicators)
- [x] AI translation (Amharic ↔ English in chat)
- [x] Video/voice calls (WebRTC infrastructure)
- [x] Deal tracker (7-stage pipeline visualization)
- [x] Ethio Telecom carrier billing (4 subscription tiers)
- [x] AI document generation (invoices, contracts, packing lists)

**Custom Features:**
- [x] 12 custom African emoji reactions (culturally inspired SVGs)
- [x] Dark/gold brand theme (premium African aesthetic)
- [x] Mobile-first responsive design
- [x] Amharic font support (Noto Sans Ethiopic)

### 🔄 Phase 2 (Planned)
- [ ] East Africa expansion (Kenya, Uganda, Tanzania)
- [ ] More languages (Swahili, Somali, Tigrinya, Oromo)
- [ ] Logistics tracking
- [ ] Quality verification partnerships
- [ ] Trade finance integration

## 📊 Business Model

**Subscription-only revenue:**

| Tier | Price (ETB/month) | Net Revenue | Features |
|------|------------------|-------------|----------|
| Free | 0 | - | 5 translations/day, 1 listing |
| Starter | 999 | ~450 ETB | 100 translations/day, 5 listings |
| Professional | 2,999 | ~1,350 ETB | Unlimited translation, 50 listings, video calls |
| Enterprise | 7,999 | ~3,600 ETB | Everything + API access, priority support |

**Revenue Split:** 45% net (55% to Ethio Telecom for carrier billing)

**Target:** 1,600 paying subscribers = ~$25,700 MRR (6 months)

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

**Backend:**
- Node.js/Express API routes
- PostgreSQL (via Supabase or local)
- Prisma ORM
- Redis (caching)

**Real-time:**
- Socket.io (chat, typing indicators)
- Supabase Realtime (presence)

**AI/Translation:**
- Google Cloud Translation API (Amharic ↔ English)
- Anthropic Claude (document generation, matching intelligence)

**Video/Voice:**
- WebRTC (Daily.co or self-hosted)

**Payments:**
- Ethio Telecom VAS carrier billing

**Storage:**
- Supabase Storage (images, documents)

**Deployment:**
- Contabo VPS (Ubuntu 22.04)
- PM2 (process manager)
- Nginx (reverse proxy)
- Let's Encrypt (SSL)

## 🏗️ Database Schema

15 core tables (all migrated):
- **User** - Profiles, roles, verification
- **Product** - Seller listings
- **BuyRequest** - Buyer requirements
- **Match** - AI-generated connections
- **Deal** - Active negotiations
- **Message** - Chat history
- **Call** - Video/audio calls
- **Document** - Generated trade docs
- **Subscription** - Payment tracking
- **Notification** - User alerts
- + 5 more (OTP, EmojiReaction, etc.)

## 🚦 Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL 17+
- Supabase account (or local setup)
- Google Cloud Translation API key
- Ethio Telecom VAS API credentials (for production)

### Local Development

```bash
# Clone repository
git clone https://github.com/ytdubai/WALKILCHAT.git
cd WALKILCHAT

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run Prisma migrations
npx prisma migrate dev

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/wakilchat"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"

# Translation
GOOGLE_CLOUD_TRANSLATE_KEY="xxx"

# Ethio Telecom (production)
ETHIO_TELECOM_API_URL="xxx"
ETHIO_TELECOM_MERCHANT_ID="xxx"
ETHIO_TELECOM_API_KEY="xxx"
```

See `SUPABASE_SETUP.md` and `TRANSLATION_SETUP.md` for detailed setup guides.

## 📁 Project Structure

```
/root/wakilchat/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Main app
│   └── call/              # Video call pages
├── lib/                    # Core libraries
│   ├── auth/              # Auth logic
│   ├── ai/                # Matching algorithm
│   ├── translation/       # Translation service
│   ├── video/             # Video call logic
│   ├── billing/           # Carrier billing
│   └── documents/         # Document generation
├── prisma/                # Database schema
├── public/                # Static assets
│   └── emojis/            # 12 custom SVG emojis
└── docs/                  # Documentation
```

## 🎨 Brand Identity

**Colors:**
- Primary Gold: #D4A853
- Background Dark: #0A0A0A
- Dark Secondary: #1A1A1A
- Text Primary: #FFFFFF

**Typography:**
- Headlines: Serif (editorial feel)
- Body: Sans-serif (Inter or system)
- Amharic: Noto Sans Ethiopic

**Always show ™ after WakilChat**

## 🔒 Security

- Supabase Auth (email, phone OTP, OAuth)
- Row-level security on all tables
- User data sync (Supabase Auth ↔ Prisma)
- Protected routes (middleware)
- HTTPS only (production)
- Environment variables (never committed)

## 📈 KPIs (Initial)

- Visitors/week: TBD
- Signup conversion: TBD
- Activated users: TBD
- Products listed: 0
- Deals created: 0
- Revenue: $0
- CAC: TBD

## 🤝 Contributing

This is a private commercial project. No external contributions accepted at this time.

## 📄 License

Copyright © 2026 WakilChat™. All rights reserved.

**Patent Pending | Registered Trademark**

Proprietary software. Unauthorized copying, distribution, or use is strictly prohibited.

## 📞 Contact

- **Founder:** Yitayal Mesfin
- **Email:** ytmesfin@icloud.com
- **Website:** https://wakilchat.com
- **GitHub:** https://github.com/ytdubai/WALKILCHAT

---

**Built in Ethiopia 🇪🇹 | For Africa 🌍 | By WakilChat™**
