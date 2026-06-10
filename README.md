# LEVERAGE - Global Trade Operating System

A comprehensive B2B marketplace and trade management platform for importers, exporters, manufacturers, and freight forwarders.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   Web App       │  │   Mobile App    │  │   Admin Panel   │              │
│  │   (Next.js)     │  │   (React Native)│  │   (Next.js)     │              │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘              │
└───────────┼────────────────────┼────────────────────┼───────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EDGE LAYER                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   Vercel CDN    │  │   CloudFlare    │  │   Load Balancer │              │
│  │   (Static)      │  │   (Security)    │  │   (AWS ALB)     │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                      NestJS Backend                                 │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────┐ │     │
│  │  │   Auth       │  │   Marketplace│  │   Orders     │  │  AI     │ │     │
│  │  │   Module     │  │   Module     │  │   Module     │  │  Agent  │ │     │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────┘ │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────┐ │     │
│  │  │   Freight    │  │   Compliance │  │   Documents  │  │ Messaging│ │     │
│  │  │   Module     │  │   Module     │  │   Module     │  │  Module │ │     │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────┘ │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │     │
│  │  │   Analytics  │  │   Billing    │  │   Network    │              │     │
│  │  │   Module     │  │   Module     │  │   Module     │              │     │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐
│   DATABASE        │    │   CACHE           │    │   SEARCH          │
│   ┌─────────────┐  │    │   ┌─────────────┐ │    │   ┌─────────────┐ │
│   │ PostgreSQL  │  │    │   │   Redis     │ │    │   │ Meilisearch │ │
│   │ (Neon)      │  │    │   │ (Upstash)   │ │    │   │             │ │
│   └─────────────┘  │    │   └─────────────┘ │    │   └─────────────┘ │
└───────────────────┘    └───────────────────┘    └───────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI SERVICES                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                      FastAPI AI Service                              │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │     │
│  │  │   RAG        │  │   Chatbot    │  │   Fraud      │                │     │
│  │  │   Pipeline   │  │   Engine     │  │   Detection  │                │     │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                │     │
│  │  ┌──────────────┐  ┌──────────────┐                                  │     │
│  │  │   Semantic   │  │   Trade      │                                  │     │
│  │  │   Search     │  │   Insights   │                                  │     │
│  │  └──────────────┘  └──────────────┘                                  │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                    │                                         │
│                                    ▼                                         │
│                         ┌───────────────────┐                               │
│                         │   OpenAI GPT-4    │                               │
│                         └───────────────────┘                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| **Backend** | NestJS, TypeORM, PostgreSQL |
| **AI Services** | FastAPI, LangChain, OpenAI GPT-4 |
| **Database** | PostgreSQL (Neon), Redis (Upstash) |
| **Search** | Meilisearch |
| **Payments** | Stripe, Razorpay |
| **Infrastructure** | Docker, Kubernetes (EKS), Vercel, AWS |

---

## Features

### Core Modules

| Module | Description | Status |
|--------|-------------|--------|
| **Auth & User** | JWT authentication, MFA, KYC verification | ✅ |
| **Marketplace** | Product listings, categories, search, filters | ✅ |
| **RFQ Engine** | Request for quotes, supplier responses, comparisons | ✅ |
| **Orders & Payments** | Order lifecycle, escrow, Stripe/Razorpay integration | ✅ |
| **Documents** | Trade document generation, PDF templates, e-signature | ✅ |
| **Compliance** | HS codes, duty calculation, sanctions screening | ✅ |
| **Freight & Logistics** | Carrier integrations, shipment tracking, insurance | ✅ |
| **AI Assistant** | Chatbot, RAG pipeline, semantic search, trade insights | ✅ |
| **Networking** | Company profiles, posts, comments, messaging | ✅ |
| **Analytics** | Dashboard metrics, event tracking, reports | ✅ |
| **Ads & Promotions** | Campaign management, credit system, targeting | ✅ |
| **Billing & Subscriptions** | Plans, subscriptions, invoices, usage tracking | ✅ |

### User Roles

- **Buyer** - Importers, distributors, retailers
- **Seller** - Manufacturers, exporters, suppliers
- **Freight Forwarder** - Logistics providers, carriers
- **Admin** - Platform administrators

### Key Capabilities

- [ ] Multi-currency transactions (USD, EUR, INR, CNY, etc.)
- [ ] Real-time chat and messaging
- [ ] Document verification and e-signature
- [ ] Risk assessment and fraud detection
- [ ] Automated compliance checking
- [ ] Shipment tracking and notifications
- [ ] AI-powered product recommendations
- [ ] Quote comparison and supplier ranking

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/imrejaul007/leverage.git
cd leverage-by-lerar

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Start infrastructure services
docker-compose up -d

# Generate Prisma client (Backend API)
cd apps/api && npx prisma generate

# Run database migrations
cd apps/api && npx prisma migrate dev

# Start development servers
npm run dev
```

### Environment Variables

See `.env.example` for all required environment variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/leverage

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# External Services
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_...
RAZORPAY_KEY=rzp_...

# Search
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_KEY=your-master-key
```

---

## Development

```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev --filter=web
npm run dev --filter=api

# Build all apps for production
npm run build

# Run tests
npm run test

# Lint and format
npm run lint
npm run format

# Database operations
cd apps/api
npx prisma studio          # Open Prisma Studio
npx prisma migrate:dev    # Run migrations
npx prisma generate       # Generate client
```

---

## API Documentation

When running locally:

| Service | URL | Docs |
|---------|-----|------|
| **Web App** | http://localhost:3000 | - |
| **API** | http://localhost:3001 | http://localhost:3001/api/docs |
| **AI Service** | http://localhost:8000 | http://localhost:8000/docs |
| **Prisma Studio** | http://localhost:5555 | - |

---

## Project Structure

See `ARCHITECTURE.md` for detailed folder structure.

---

## Deployment

See `DEPLOY.md` for detailed deployment instructions.

---

## License

Proprietary - All rights reserved © 2024 Leverage by Lerar