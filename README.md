# Leverage by Lerar

## Global Trade Operating System

A comprehensive B2B marketplace and trade management platform for importers, exporters, manufacturers, and freight forwarders.

### Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeORM, PostgreSQL
- **AI Services**: FastAPI, LangChain, OpenAI
- **Database**: PostgreSQL (Neon), Redis (Upstash)
- **Search**: Meilisearch
- **Payments**: Stripe, Razorpay
- **Infrastructure**: Docker, Kubernetes (EKS), Vercel

### Project Structure

```
leverage-by-lerar/
├── apps/
│   ├── web/              # Next.js frontend
│   ├── api/              # NestJS backend
│   └── ai/               # FastAPI AI service
├── packages/
│   └── shared/            # Shared types & utilities
├── infrastructure/        # Terraform, Kubernetes configs
└── turbo.json           # Turborepo config
```

### Getting Started

#### Prerequisites

- Node.js 20+
- Docker
- PostgreSQL
- Redis

#### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start infrastructure
docker-compose up -d

# Generate Prisma client
cd apps/api && npx prisma generate

# Run database migrations
cd apps/api && npx prisma migrate dev

# Start development servers
npm run dev
```

#### Environment Variables

See `.env.example` for required environment variables.

### Modules

1. **Auth & User Management** - JWT authentication, MFA, KYC
2. **Marketplace** - Products, categories, RFQ engine
3. **Orders & Payments** - Order lifecycle, Stripe integration
4. **Documents** - Trade document generation, PDF templates
5. **Compliance** - HS codes, duty calculation, sanctions screening
6. **Freight & Logistics** - Carrier integrations, shipment tracking
7. **AI & Search** - Chatbot, RAG pipeline, semantic search
8. **Networking** - Company profiles, posts, messaging
9. **Analytics** - Dashboard metrics, event tracking
10. **Ads** - Campaign management, credit system

### API Documentation

Once running, visit:
- Swagger UI: `http://localhost:3001/api/docs`
- AI Service: `http://localhost:8000/docs`

### Development

```bash
# Run all apps in dev mode
npm run dev

# Build all apps
npm run build

# Run tests
npm run test

# Lint
npm run lint
```

### License

Proprietary - All rights reserved
