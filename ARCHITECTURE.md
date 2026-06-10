# LEVERAGE - Architecture Documentation

## Folder Structure

```
leverage-by-lerar/
├── apps/
│   ├── web/                          # Next.js 14 Frontend (App Router)
│   │   ├── public/                   # Static assets
│   │   │   └── leverage-logo.png     # Brand logo
│   │   └── src/
│   │       ├── app/                  # Next.js App Router
│   │       │   ├── (auth)/            # Authentication routes
│   │       │   │   ├── login/         #   Login page
│   │       │   │   └── signup/       #   Signup page
│   │       │   ├── (dashboard)/       # Protected dashboard routes
│   │       │   │   ├── account/       #   Account settings
│   │       │   │   ├── ads/           #   Ad campaigns
│   │       │   │   ├── ai/            #   AI Assistant
│   │       │   │   ├── analytics/     #   Analytics & metrics
│   │       │   │   ├── billing/       #   Billing & subscriptions
│   │       │   │   ├── compliance/    #   HS codes, duties
│   │       │   │   ├── consultations/ #   Expert consultations
│   │       │   │   ├── dashboard/     #   Main dashboard
│   │       │   │   ├── documents/     #   Trade documents
│   │       │   │   ├── freight/       #   Freight & shipping
│   │       │   │   ├── marketplace/   #   Products marketplace
│   │       │   │   ├── messages/      #   Messaging system
│   │       │   │   ├── network/       #   Networking & posts
│   │       │   │   ├── orders/        #   Order management
│   │       │   │   ├── products/      #   Product management
│   │       │   │   ├── rfqs/          #   Request for quotes
│   │       │   │   └── settings/     #   User settings
│   │       │   ├── about/            #   About page
│   │       │   ├── contact/          #   Contact page
│   │       │   ├── onboarding/       #   Onboarding flow
│   │       │   ├── privacy/          #   Privacy policy
│   │       │   ├── terms/           #   Terms of service
│   │       │   ├── layout.tsx        #   Root layout
│   │       │   └── page.tsx          #   Landing page
│   │       ├── components/            # React components
│   │       │   ├── ui/               #   UI primitives (Button, Card, Badge)
│   │       │   ├── BottomNav.tsx     #   Mobile bottom navigation
│   │       │   ├── Logo.tsx          #   Logo component
│   │       │   ├── MobileHeader.tsx  #   Mobile header
│   │       │   ├── MobileNav.tsx     #   Mobile sidebar navigation
│   │       │   ├── Preloader.tsx      #   Loading state
│   │       │   ├── ProtectedRoute.tsx #  Route protection
│   │       │   ├── Toast.tsx         #   Toast notifications
│   │       │   └── providers.tsx      #   Context providers
│   │       ├── hooks/                # Custom React hooks
│   │       │   └── useAuth.ts        #   Authentication hook
│   │       ├── lib/                  # Utilities & helpers
│   │       │   ├── api-client.ts     #   API client configuration
│   │       │   ├── mock-data.ts      #   Mock data for development
│   │       │   └── utils.ts          #   Utility functions
│   │       ├── store/                # State management (Redux)
│   │       │   ├── index.ts          #   Store configuration
│   │       │   └── slices/           #   Redux slices
│   │       │       ├── authSlice.ts  #   Auth state
│   │       │       └── uiSlice.ts    #   UI state
│   │       ├── app/                  # App configuration
│   │       └── tailwind.config.ts    # Tailwind CSS config
│   │
│   ├── api/                          # NestJS Backend API
│   │   └── src/
│   │       ├── main.ts               # Application entry point
│   │       ├── app.module.ts        # Root module
│   │       ├── common/              # Shared utilities
│   │       │   ├── decorators/       # Custom decorators
│   │       │   │   ├── public.decorator.ts
│   │       │   │   └── roles.decorator.ts
│   │       │   └── enums.ts         # Shared enums
│   │       ├── prisma/              # Prisma ORM
│   │       │   ├── prisma.module.ts
│   │       │   └── prisma.service.ts
│   │       ├── shared/              # Shared modules
│   │       │   ├── redis.module.ts
│   │       │   └── redis.service.ts
│   │       └── modules/             # Feature modules
│   │           ├── ads/             # Ad campaigns
│   │           ├── ai/             # AI services
│   │           ├── analytics/      # Analytics
│   │           ├── auth/           # Authentication
│   │           │   ├── decorators/  #   Auth decorators
│   │           │   ├── dto/        #   Data transfer objects
│   │           │   ├── entities/   #   Database entities
│   │           │   ├── guards/     #   Auth guards
│   │           │   └── strategies/ #   Passport strategies
│   │           ├── billing/        # Billing
│   │           ├── categories/     # Product categories
│   │           ├── companies/     # Company management
│   │           ├── compliance/     # Trade compliance
│   │           ├── documents/     # Document management
│   │           ├── freight/        # Freight & shipping
│   │           ├── kyc/           # KYC verification
│   │           ├── messaging/     # Real-time messaging
│   │           ├── notifications/  # Push notifications
│   │           ├── orders/        # Order management
│   │           ├── payments/      # Payment processing
│   │           ├── posts/         # Community posts
│   │           ├── products/      # Product catalog
│   │           ├── rfqs/         # Request for quotes
│   │           ├── search/        # Search functionality
│   │           ├── shipments/     # Shipment tracking
│   │           └── users/         # User management
│   │
│   └── ai/                           # FastAPI AI Service
│       └── src/
│           ├── main.py              # Application entry
│           ├── agents/             # AI agents
│           ├── routers/            # API routes
│           └── services/           # Business logic
│
├── packages/
│   └── shared/                      # Shared code between apps
│
├── infrastructure/                  # Infrastructure as Code
│   ├── terraform/                   # Terraform configurations
│   └── k8s/                         # Kubernetes manifests
│
├── .github/                         # GitHub workflows
├── .vercel/                         # Vercel config
├── .turbo/                          # Turborepo cache
│
├── .env                             # Environment variables
├── .env.example                     # Example env file
├── .env.production                  # Production env
├── .eslintrc.js                     # ESLint config
├── .prettierrc                      # Prettier config
│
├── docker-compose.yml               # Docker services
├── package.json                     # Root package.json
├── turbo.json                       # Turborepo config
├── tsconfig.base.json              # Base TypeScript config
├── README.md                        # This file
└── DEPLOY.md                        # Deployment guide
```

---

## Database Schema (Key Entities)

```
users
├── id (UUID)
├── email (String, unique)
├── password_hash (String)
├── role (Enum: BUYER, SELLER, FORWARDER, ADMIN)
├── kyc_status (Enum: PENDING, VERIFIED, REJECTED)
├── created_at (Timestamp)
└── updated_at (Timestamp)

companies
├── id (UUID)
├── name (String)
├── country (String)
├── type (Enum: IMPORTER, EXPORTER, MANUFACTURER, FORWARDER)
├── verified (Boolean)
└── logo_url (String)

products
├── id (UUID)
├── company_id (UUID, FK)
├── name (String)
├── description (Text)
├── category_id (UUID, FK)
├── hs_code (String)
├── min_order_qty (Integer)
├── price_usd (Decimal)
└── images (JSON[])

rfqs
├── id (UUID)
├── buyer_id (UUID, FK)
├── title (String)
├── description (Text)
├── quantity (Integer)
├── unit (String)
├── target_price (Decimal)
├── destination_country (String)
├── deadline (Timestamp)
└── status (Enum: OPEN, CLOSED, AWARDED)

orders
├── id (UUID)
├── rfq_id (UUID, FK)
├── buyer_id (UUID, FK)
├── seller_id (UUID, FK)
├── total_amount (Decimal)
├── currency (String)
├── status (Enum: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
└── created_at (Timestamp)

shipments
├── id (UUID)
├── order_id (UUID, FK)
├── carrier (String)
├── tracking_number (String)
├── origin_port (String)
├── destination_port (String)
├── estimated_arrival (Date)
└── status (Enum: PENDING, IN_TRANSIT, CUSTOMS, DELIVERED)
```

---

## API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh token

### Marketplace
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (seller)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### RFQs
- `GET /api/rfqs` - List RFQs
- `GET /api/rfqs/:id` - Get RFQ details
- `POST /api/rfqs` - Create RFQ (buyer)
- `POST /api/rfqs/:id/respond` - Submit quote (seller)
- `PUT /api/rfqs/:id/award` - Award to supplier

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update status

### Compliance
- `GET /api/compliance/hs-codes` - Search HS codes
- `POST /api/compliance/duty-calc` - Calculate duty
- `POST /api/compliance/screen` - Sanctions screening

### Freight
- `GET /api/freight/quotes` - Get shipping quotes
- `POST /api/freight/book` - Book shipment
- `GET /api/freight/track/:id` - Track shipment

### AI
- `POST /api/ai/chat` - Chat with AI
- `POST /api/ai/analyze` - Analyze trade data
- `GET /api/ai/recommendations` - Product recommendations

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `REDIS_URL` | Redis connection string | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `JWT_EXPIRES_IN` | Token expiration time | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `STRIPE_SECRET_KEY` | Stripe API key | ✅ |
| `RAZORPAY_KEY` | Razorpay API key | ❌ |
| `MEILISEARCH_HOST` | Meilisearch host | ✅ |
| `MEILISEARCH_KEY` | Meilisearch API key | ✅ |
| `CORS_ORIGIN` | Allowed origins | ✅ |

---

## Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Emerald | `#154230` | Primary brand color (60%) |
| Burgundy | `#5D1E21` | Secondary/accent color (40%) |
| Antique Gold | `#A6824A` | Highlights, premium elements |
| Background | `#E6E2DA` | Main background |
| Text Primary | `#101111` | Headings |
| Text Secondary | `#4A4A4A` | Body text |
| Text Muted | `#777777` | Captions |

### Typography
- Headings: Bold, 2xl-4xl
- Body: Regular, sm-base
- Captions: Light, xs-sm

### Spacing
- Base unit: 4px
- Padding: 4, 6, 8, 12, 16, 24
- Border radius: 8-16px (rounded), 24-32px (pill)

### Components
- Cards: White background, rounded-2xl, shadow-sm
- Buttons: Primary (green), Secondary (white), Danger (burgundy)
- Inputs: h-12 to h-14, rounded-xl
- Navigation: Fixed bottom on mobile, fixed sidebar on desktop