# LEVERAGE - Folder Structure

```
leverage-by-lerar/
├── apps/
│   ├── api/                          # NestJS Backend API
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── main.ts               # Application entry point
│   │       ├── app.module.ts         # Root NestJS module
│   │       ├── common/
│   │       │   ├── decorators/
│   │       │   │   ├── public.decorator.ts
│   │       │   │   └── roles.decorator.ts
│   │       │   └── enums.ts
│   │       ├── prisma/
│   │       │   ├── prisma.module.ts
│   │       │   └── prisma.service.ts
│   │       ├── shared/
│   │       │   ├── redis.module.ts
│   │       │   └── redis.service.ts
│   │       └── modules/
│   │           ├── ads/
│   │           │   ├── ads.controller.ts
│   │           │   ├── ads.module.ts
│   │           │   ├── ads.service.ts
│   │           │   ├── dto/
│   │           │   │   └── ads.dto.ts
│   │           │   └── entities/
│   │           │       ├── ad-campaign.entity.ts
│   │           │       ├── ad-credit.entity.ts
│   │           │       └── index.ts
│   │           ├── ai/
│   │           │   ├── ai.controller.ts
│   │           │   ├── ai.module.ts
│   │           │   ├── ai.service.ts
│   │           │   └── entities/
│   │           │       ├── ai-agent.entity.ts
│   │           │       ├── ai-conversation.entity.ts
│   │           │       ├── ai-embedding.entity.ts
│   │           │       ├── ai-message.entity.ts
│   │           │       ├── ai-session.entity.ts
│   │           │       ├── fraud-signal.entity.ts
│   │           │       └── index.ts
│   │           ├── analytics/
│   │           │   ├── analytics.controller.ts
│   │           │   ├── analytics.module.ts
│   │           │   ├── analytics.service.ts
│   │           │   ├── dto/
│   │           │   │   └── analytics.dto.ts
│   │           │   └── entities/
│   │           │       ├── analytics-event.entity.ts
│   │           │       ├── dashboard-metric.entity.ts
│   │           │       └── index.ts
│   │           ├── auth/
│   │           │   ├── auth.controller.ts
│   │           │   ├── auth.module.ts
│   │           │   ├── auth.service.ts
│   │           │   ├── decorators/
│   │           │   │   └── current-user.decorator.ts
│   │           │   ├── dto/
│   │           │   │   ├── login.dto.ts
│   │           │   │   └── signup.dto.ts
│   │           │   ├── entities/
│   │           │   │   ├── audit-log.entity.ts
│   │           │   │   ├── index.ts
│   │           │   │   ├── session.entity.ts
│   │           │   │   └── user.entity.ts
│   │           │   ├── guards/
│   │           │   │   ├── jwt-auth.guard.ts
│   │           │   │   ├── local-auth.guard.ts
│   │           │   │   └── roles.guard.ts
│   │           │   └── strategies/
│   │           │       ├── jwt.strategy.ts
│   │           │       └── local.strategy.ts
│   │           ├── billing/
│   │           │   ├── billing.controller.ts
│   │           │   ├── billing.module.ts
│   │           │   ├── billing.service.ts
│   │           │   ├── dto/
│   │           │   │   └── billing.dto.ts
│   │           │   └── entities/
│   │           │       ├── index.ts
│   │           │       ├── plan.entity.ts
│   │           │       └── subscription.entity.ts
│   │           ├── categories/
│   │           │   ├── categories.controller.ts
│   │           │   ├── categories.module.ts
│   │           │   ├── categories.service.ts
│   │           │   └── entities/
│   │           │       └── category.entity.ts
│   │           ├── companies/
│   │           │   ├── companies.controller.ts
│   │           │   ├── companies.module.ts
│   │           │   ├── companies.service.ts
│   │           │   ├── dto/
│   │           │   │   ├── create-company.dto.ts
│   │           │   │   ├── invite-member.dto.ts
│   │           │   │   └── update-company.dto.ts
│   │           │   └── entities/
│   │           │       ├── company-document.entity.ts
│   │           │       ├── company-follow.entity.ts
│   │           │       ├── company-member.entity.ts
│   │           │       ├── company-profile.entity.ts
│   │           │       ├── company.entity.ts
│   │           │       └── index.ts
│   │           ├── compliance/
│   │           │   ├── compliance.controller.ts
│   │           │   ├── compliance.module.ts
│   │           │   ├── compliance.service.ts
│   │           │   ├── duty-calculator.service.ts
│   │           │   ├── hs-code.service.ts
│   │           │   ├── sanction-screening.service.ts
│   │           │   └── entities/
│   │           │       ├── compliance-check.entity.ts
│   │           │       ├── duty-rate.entity.ts
│   │           │       ├── hs-code-restriction.entity.ts
│   │           │       ├── hs-code.entity.ts
│   │           │       ├── index.ts
│   │           │       └── sanctions-list.entity.ts
│   │           ├── documents/
│   │           │   ├── document-generator.service.ts
│   │           │   ├── documents.controller.ts
│   │           │   ├── documents.module.ts
│   │           │   ├── documents.service.ts
│   │           │   └── entities/
│   │           │       ├── document-template.entity.ts
│   │           │       ├── index.ts
│   │           │       └── trade-document.entity.ts
│   │           ├── freight/
│   │           │   ├── carrier-integration.service.ts
│   │           │   ├── dto/
│   │           │   │   ├── booking-request.dto.ts
│   │           │   │   └── quote-request.dto.ts
│   │           │   ├── entities/
│   │           │   │   ├── carrier.entity.ts
│   │           │   │   ├── container-booking.entity.ts
│   │           │   │   ├── freight-quote.entity.ts
│   │           │   │   ├── index.ts
│   │           │   │   ├── insurance-policy.entity.ts
│   │           │   │   ├── shipment-tracking.entity.ts
│   │           │   │   └── shipment.entity.ts
│   │           │   ├── freight.controller.ts
│   │           │   ├── freight.module.ts
│   │           │   └── freight.service.ts
│   │           ├── kyc/
│   │           │   ├── dto/
│   │           │   │   ├── upload-document.dto.ts
│   │           │   │   ├── verify-gst.dto.ts
│   │           │   │   └── verify-iec.dto.ts
│   │           │   ├── entities/
│   │           │   │   └── index.ts
│   │           │   │       └── kyc-status.entity.ts
│   │           │   ├── kyc.controller.ts
│   │           │   ├── kyc.module.ts
│   │           │   └── kyc.service.ts
│   │           ├── messaging/
│   │           │   ├── entities/
│   │           │   │   ├── conversation.entity.ts
│   │           │   │   ├── index.ts
│   │           │   │   ├── message.entity.ts
│   │           │   │   └── notification.entity.ts
│   │           │   ├── messages.controller.ts
│   │           │   ├── messages.gateway.ts
│   │           │   ├── messages.service.ts
│   │           │   ├── messaging.controller.ts
│   │           │   ├── messaging.module.ts
│   │           │   └── messaging.service.ts
│   │           ├── notifications/
│   │           │   ├── entities/
│   │           │   │   ├── index.ts
│   │           │   │   └── notification.entity.ts
│   │           │   ├── notifications.controller.ts
│   │           │   ├── notifications.module.ts
│   │           │   └── notifications.service.ts
│   │           ├── orders/
│   │           │   ├── dto/
│   │           │   │   └── orders.dto.ts
│   │           │   ├── entities/
│   │           │   │   ├── index.ts
│   │           │   │   ├── invoice.entity.ts
│   │           │   │   ├── order-item.entity.ts
│   │           │   │   ├── order.entity.ts
│   │           │   │   ├── payment-transaction.entity.ts
│   │           │   │   ├── rfq-response.entity.ts
│   │           │   │   └── rfq.entity.ts
│   │           │   ├── orders.controller.ts
│   │           │   ├── orders.module.ts
│   │           │   └── orders.service.ts
│   │           ├── payments/
│   │           │   ├── dto/
│   │           │   │   └── payments.dto.ts
│   │           │   ├── entities/
│   │           │   │   ├── escrow-hold.entity.ts
│   │           │   │   └── payment-transaction.entity.ts
│   │           │   ├── payments.controller.ts
│   │           │   ├── payments.module.ts
│   │           │   ├── payments.service.ts
│   │           │   └── stripe.service.ts
│   │           ├── posts/
│   │           │   ├── entities/
│   │           │   │   ├── comment.entity.ts
│   │           │   │   ├── community-member.entity.ts
│   │           │   │   ├── community.entity.ts
│   │           │   │   ├── index.ts
│   │           │   │   ├── post-like.entity.ts
│   │           │   │   └── post.entity.ts
│   │           │   ├── posts.controller.ts
│   │           │   ├── posts.gateway.ts
│   │           │   ├── posts.module.ts
│   │           │   └── posts.service.ts
│   │           ├── products/
│   │           │   ├── entities/
│   │           │   │   ├── category.entity.ts
│   │           │   │   ├── index.ts
│   │           │   │   ├── product-variant.entity.ts
│   │           │   │   └── product.entity.ts
│   │           │   ├── products.controller.ts
│   │           │   ├── products.module.ts
│   │           │   └── products.service.ts
│   │           ├── rfqs/
│   │           │   ├── entities/
│   │           │   │   ├── rfq-response.entity.ts
│   │           │   │   └── rfq.entity.ts
│   │           │   ├── rfqs.controller.ts
│   │           │   ├── rfqs.module.ts
│   │           │   └── rfqs.service.ts
│   │           ├── search/
│   │           │   ├── index.ts
│   │           │   ├── search.controller.ts
│   │           │   ├── search.module.ts
│   │           │   └── search.service.ts
│   │           ├── shipments/
│   │           │   ├── shipments.controller.ts
│   │           │   ├── shipments.module.ts
│   │           │   └── shipments.service.ts
│   │           └── users/
│   │               ├── dto/
│   │               │   └── update-profile.dto.ts
│   │               ├── users.controller.ts
│   │               ├── users.module.ts
│   │               └── users.service.ts
│   │
│   └── web/                          # Next.js 14 Frontend
│       ├── next-env.d.ts
│       ├── next.config.js
│       ├── package.json
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── public/
│       │   └── leverage-logo.png
│       └── src/
│           ├── app/
│           │   ├── (auth)/
│           │   │   ├── login/
│           │   │   │   └── page.tsx
│           │   │   └── signup/
│           │   │       └── page.tsx
│           │   ├── (dashboard)/
│           │   │   ├── account/
│           │   │   │   └── page.tsx
│           │   │   ├── ads/
│           │   │   │   ├── [id]/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── ai/
│           │   │   │   └── page.tsx
│           │   │   ├── analytics/
│           │   │   │   └── page.tsx
│           │   │   ├── billing/
│           │   │   │   └── page.tsx
│           │   │   ├── compliance/
│           │   │   │   ├── duty-calculator/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── hs-codes/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── consultations/
│           │   │   │   └── page.tsx
│           │   │   ├── dashboard/
│           │   │   │   └── page.tsx
│           │   │   ├── documents/
│           │   │   │   ├── [id]/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── freight/
│           │   │   │   ├── shipments/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── layout.tsx
│           │   │   ├── marketplace/
│           │   │   │   ├── [id]/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── compare/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── inbox/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── messages/
│           │   │   │   ├── [id]/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── network/
│           │   │   │   ├── [id]/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── orders/
│           │   │   │   ├── [id]/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── products/
│           │   │   │   ├── [id]/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── new/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   ├── rfqs/
│           │   │   │   ├── new/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── page.tsx
│           │   │   └── settings/
│           │   │       └── page.tsx
│           │   ├── about/
│           │   │   └── page.tsx
│           │   ├── contact/
│           │   │   └── page.tsx
│           │   ├── forgot-password/
│           │   │   └── page.tsx
│           │   ├── layout.tsx
│           │   ├── onboarding/
│           │   │   └── page.tsx
│           │   ├── page.tsx
│           │   ├── privacy/
│           │   │   └── page.tsx
│           │   └── terms/
│           │       └── page.tsx
│           ├── components/
│           │   ├── ui/
│           │   │   ├── Badge.tsx
│           │   │   ├── Button.tsx
│           │   │   ├── Card.tsx
│           │   │   └── index.ts
│           │   ├── BottomNav.tsx
│           │   ├── Logo.tsx
│           │   ├── MobileHeader.tsx
│           │   ├── MobileNav.tsx
│           │   ├── Preloader.tsx
│           │   ├── ProtectedRoute.tsx
│           │   ├── Toast.tsx
│           │   └── providers.tsx
│           ├── hooks/
│           │   └── useAuth.ts
│           ├── lib/
│           │   ├── api-client.ts
│           │   ├── mock-data.ts
│           │   └── utils.ts
│           └── store/
│               ├── index.ts
│               └── slices/
│                   ├── authSlice.ts
│                   └── uiSlice.ts
│
├── packages/
│   └── shared/                       # Shared types& utilities
│
├── infrastructure/
│   ├── terraform/                   # Terraform configurations
│   └── k8s/                         # Kubernetes manifests
│
├── .github/
│   └── workflows/                   # GitHub Actions
│
├── .vercel/
│   └── README.txt
│
├── .env
├── .env.example
├── .env.production
├── .env.production.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── .turbo/
├── docker-compose.yml
├── package.json
├── turbo.json
├── tsconfig.base.json
├── README.md
├── ARCHITECTURE.md
├── FEATURES.md
├── FOLDER_STRUCTURE.md
└── DEPLOY.md
```

---

## Quick Navigation

| Directory | Purpose |
|----------|---------|
| `apps/web/src/app/` | Next.js pages (App Router) |
| `apps/web/src/components/` | Reusable React components |
| `apps/web/src/hooks/` | Custom React hooks |
| `apps/web/src/lib/` | Utilities and API client |
| `apps/web/src/store/` | Redux state management |
| `apps/api/src/modules/` | NestJS feature modules |
| `apps/api/src/modules/*/entities/` | Database entities (Prisma) |
| `packages/shared/` | Code shared between apps |