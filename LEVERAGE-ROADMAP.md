# LEVERAGE - Trade OS for Import/Export Business

**Version:** 1.0
**Last Updated:** June 16, 2026
**Status:** In Development

---

## Overview

LEVERAGE is a comprehensive **Trade OS (Operating System)** for import/export businesses. It provides modular, subdomain-based solutions for every aspect of global trade - from documents to compliance to AI-powered insights.

**Partnership:** Integrated with HOJAI AI for business intelligence and automation.

---

## 🎯 Vision

> "Every import/export business runs on LEVERAGE - one platform, every trade function."

**Mission:** Simplify global trade with AI-powered tools, automated workflows, and connected services.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LEVERAGE Trade OS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────┐    ┌─────────────────┐              │
│   │   Main Website  │    │   Marketplace   │              │
│   │ leverage.com    │    │ marketplace.    │              │
│   │                 │    │ leverage.com    │              │
│   └────────┬────────┘    └─────────────────┘              │
│            │                                              │
│   ┌────────┴────────────────────────────────┐              │
│   │         HOJAI AI Integration             │              │
│   │  • Business Copilot                      │              │
│   │  • 174 AI Employees                      │              │
│   │  • AgentOS                              │              │
│   │  • SUTAR OS                             │              │
│   └─────────────────────────────────────────┘              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 Subdomains

| Subdomain | Purpose | Status |
|-----------|---------|--------|
| **leverage.com** | Main portal & business dashboard | ✅ Built |
| **marketplace.leverage.com** | Buy & sell products | ✅ Built |
| **docs.leverage.com** | Document generator (Invoice, BL, COO) | 📋 Planned |
| **freight.leverage.com** | Logistics & shipping | 📋 Planned |
| **compliance.leverage.com** | HS codes, duty calculator | 📋 Planned |
| **network.leverage.com** | Supplier/buyer directory | 📋 Planned |
| **pay.leverage.com** | Payments & billing | 📋 Planned |
| **analytics.leverage.com** | Business intelligence | 📋 Planned |
| **ai.leverage.com** | AI Copilot & agents | 📋 Planned |

---

## 🤖 HOJAI AI Integration

### LEVERAGE × HOJAI AI Services

LEVERAGE connects to HOJAI AI infrastructure for business intelligence and automation.

| LEVERAGE Service | Port | Purpose | HOJAI Connection |
|-----------------|------|---------|------------------|
| **Intelligence** | 4761 | Analytics, reports, insights | TwinOS Hub, SUTAR OS |
| **Memory** | 4762 | AI memory, vectors | AgentOS |
| **Twin** | 4763 | Digital twins | TwinOS Hub (4705) |
| **Agents** | 4764 | Task execution | AgentOS |
| **Copilot** | 4765 | Chat assistant | Business Copilot |

### HOJAI AI Services Used

| Service | Port | Purpose |
|---------|------|---------|
| **RABTUL Auth** | 4002 | Authentication |
| **RABTUL Notification** | - | Notifications |
| **TwinOS Hub** | 4705 | Digital twin registry |
| **AgentOS** | 4550 | Agent marketplace |
| **SUTAR OS** | 4140+ | Autonomous operations |

### AI Features to Build

| Feature | Description | Priority |
|---------|-------------|----------|
| **AI Copilot** | Chat with business data | High |
| **Document Agent** | Auto-generate invoices, BL, COO | High |
| **Compliance Agent** | HS code lookup, duty calc | High |
| **Freight Agent** | Track shipments, book cargo | Medium |
| **RFQ Agent** | Match buyers to suppliers | Medium |
| **Supplier Agent** | Negotiate, verify suppliers | Medium |
| **SUTAR OS** | Autonomous procurement | Low |

---

## 📦 Current Structure

```
leverage-by-lerar/
├── apps/
│   ├── web/                    # Main website (leverage.com)
│   │   └── src/app/
│   │       ├── page.tsx       # Home page
│   │       ├── (auth)/        # Login, Signup
│   │       ├── (dashboard)/    # Dashboard pages
│   │       │   ├── dashboard/ # Main dashboard
│   │       │   ├── documents/ # Trade documents
│   │       │   ├── compliance/ # HS codes, duties
│   │       │   ├── freight/   # Logistics
│   │       │   ├── marketplace/ # Products, RFQs
│   │       │   ├── products/  # My products
│   │       │   ├── orders/    # Order management
│   │       │   ├── messages/   # Chat
│   │       │   ├── analytics/ # Reports
│   │       │   ├── billing/   # Payments
│   │       │   ├── ai/        # AI Assistant
│   │       │   └── ...         # More modules
│   │       └── (public)/       # About, Contact, etc.
│   │
│   ├── marketplace/            # Marketplace subdomain
│   │   └── src/app/
│   │       └── page.tsx        # Marketplace homepage
│   │
│   ├── api/                    # NestJS Backend
│   │   └── src/modules/
│   │       ├── auth/           # Authentication
│   │       ├── users/          # User management
│   │       ├── products/       # Product catalog
│   │       ├── orders/         # Order management
│   │       ├── rfqs/           # RFQ system
│   │       ├── payments/       # Payment processing
│   │       ├── freight/        # Logistics
│   │       ├── documents/      # Trade documents
│   │       ├── compliance/     # HS codes
│   │       └── ...             # More modules
│   │
│   └── ai/                     # AI Service (planned)
│
├── prisma/                     # Database schema
└── package.json               # Monorepo root
```

---

## 📊 API Backend (21 Modules)

| Module | Status | Description |
|--------|--------|-------------|
| auth | ✅ | JWT, OAuth authentication |
| users | ✅ | User management |
| companies | ✅ | Business profiles |
| kyc | ✅ | KYC verification |
| products | ✅ | Product catalog |
| orders | ✅ | Order management |
| rfqs | ✅ | Request for Quotes |
| payments | ✅ | Payment processing |
| billing | ✅ | Invoicing |
| freight | ✅ | Logistics & shipping |
| shipments | ✅ | Shipment tracking |
| documents | ✅ | Trade documents |
| compliance | ✅ | HS codes, regulations |
| messaging | ✅ | Chat/messages |
| notifications | ✅ | Push/email |
| ads | ✅ | Advertisements |
| analytics | ✅ | Reports & insights |
| ai | ⚠️ | AI features |
| search | ✅ | Product search |
| categories | ✅ | Category management |
| posts | ✅ | Blog/posts |

---

## 📄 Pages (44 Total)

### Public Pages
- `/` - Home
- `/about`, `/contact`, `/blog`, `/careers`
- `/privacy`, `/terms`, `/security`

### Auth Pages
- `/login`, `/signup`, `/forgot-password`, `/onboarding`

### Dashboard Pages
- `/dashboard` - Main dashboard
- `/documents`, `/documents/[id]` - Trade documents
- `/compliance`, `/compliance/hs-codes`, `/compliance/duty-calculator` - Compliance
- `/freight`, `/freight/shipments` - Logistics
- `/marketplace`, `/marketplace/[id]`, `/marketplace/compare`, `/marketplace/inbox` - Marketplace
- `/products`, `/products/new`, `/products/[id]` - My products
- `/rfqs`, `/rfqs/new` - RFQs
- `/orders`, `/orders/[id]` - Orders
- `/network`, `/network/[id]` - Network
- `/messages`, `/messages/[id]` - Messages
- `/analytics` - Reports
- `/billing` - Billing
- `/ads`, `/ads/[id]` - Ads
- `/ai` - AI Assistant
- `/consultations` - Expert consultations
- `/settings` - Settings
- `/account` - Account

---

## 🚀 Roadmap

### Phase 1: Foundation (Complete)
- [x] Main website with all pages
- [x] Marketplace subdomain
- [x] Basic API backend
- [x] User authentication

### Phase 2: Marketplace (In Progress)
- [x] Marketplace homepage
- [ ] Product detail pages
- [ ] Cart & checkout
- [ ] Supplier profiles
- [ ] Order management UI
- [ ] Payment integration

### Phase 3: Core Modules
- [ ] **docs.leverage.com** - Document generator
  - Invoice templates
  - Bill of Lading (BL)
  - Certificate of Origin (COO)
  - Letter of Credit (LC)
- [ ] **freight.leverage.com** - Logistics
  - Carrier integrations
  - Shipment tracking
  - Rate comparison
- [ ] **compliance.leverage.com** - Compliance
  - HS code database
  - Duty calculator
  - Import restrictions

### Phase 4: AI Integration (Later)
- [ ] **ai.leverage.com** - AI Portal
  - AI Copilot UI
  - Document Agent
  - Compliance Agent
  - Freight Agent
  - RFQ Agent
- [ ] HOJAI AI integration
  - Connect to leverge-intelligence (4761)
  - Connect to leverge-memory (4762)
  - Connect to leverge-twin (4763)
  - Connect to leverge-agents (4764)
  - Connect to leverge-copilot (4765)

### Phase 5: Network & Payments
- [ ] **network.leverage.com** - Business directory
- [ ] **pay.leverage.com** - Payment gateway
- [ ] **analytics.leverage.com** - BI dashboard

---

## 💰 Business Model

| Tier | Price | Features |
|------|-------|----------|
| **Starter** | Free | Basic features, limited products |
| **Professional** | $99/mo | Full marketplace, 100 products |
| **Business** | $299/mo | All modules, unlimited products |
| **Enterprise** | Custom | White-label, API access, SLA |

---

## 👥 Team

**CEO:** Rejaul Karim

**Partnership:** HOJAI AI (AI infrastructure provider)

---

## 📞 Contact

- **Website:** leverage.com
- **Status:** In Development

---

## 📝 Notes

### HOJAI AI Integration Details

LEVERAGE is a client of HOJAI AI, utilizing their infrastructure services:
- RABTUL Auth Service for authentication
- TwinOS Hub for digital twins
- AgentOS for AI agents
- SUTAR OS for autonomous operations

**AI services will be built later** - focused on core platform first.

### Tech Stack
- **Frontend:** Next.js 15, React 19, TypeScript
- **Backend:** NestJS, Node.js 20+
- **Database:** PostgreSQL (Prisma)
- **Cache:** Redis
- **UI:** Tailwind CSS, Framer Motion
- **AI:** HOJAI AI (AgentOS, Copilot, SUTAR OS)
- **Auth:** JWT, HOJAI RABTUL Auth

---

*Last Updated: June 16, 2026*
