# Deployment Guide

## Frontend (Vercel)

### 1. Connect Repository
```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-org/leverage-by-lerar.git
git push -u origin main
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy frontend only
cd apps/web
vercel --prod
```

### 3. Set Environment Variables in Vercel Dashboard
- `NEXT_PUBLIC_API_URL` → Your API URL (Railway/Render)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Stripe publishable key

---

## Backend (Railway)

### 1. Deploy API
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select `leverage-by-lerar` repo
4. Set root directory: `apps/api`

### 2. Add PostgreSQL Database
```bash
# In Railway dashboard
# Add Plugin → PostgreSQL
# Copy connection string to DATABASE_URL
```

### 3. Add Environment Variables
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secure-secret
STRIPE_SECRET_KEY=sk_live_...
OPENAI_API_KEY=sk-...
REDIS_URL=redis://...
NEXT_PUBLIC_API_URL=https://your-frontend.vercel.app
```

### 4. Build Command
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

---

## AI Service (Railway/Fly.io)

### Deploy FastAPI
```bash
# Using Railway
cd apps/ai
railway init
railway up
```

### Environment Variables
```
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
REDIS_URL=redis://...
```

---

## Database (Neon - Alternative)

### 1. Create Neon Project
```bash
# Go to neon.tech
# Create new project
# Copy connection string
```

### 2. Update DATABASE_URL
```
DATABASE_URL=postgresql://user:password@ep-xxx-xxx-123456.us-east-2.aws.neon.tech/leverage?sslmode=require
```

---

## Domain Setup

### Vercel Domain
1. Project Settings → Domains
2. Add `app.leveragebylerar.com`
3. Configure DNS records

### Railway Custom Domain
1. Settings → Networking → Domains
2. Add `api.leveragebylerar.com`

---

## Post-Deployment Checklist

- [ ] Set all environment variables
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Verify CORS settings (allow frontend domain)
- [ ] Test authentication flow
- [ ] Configure Stripe webhook endpoints
- [ ] Set up monitoring (Sentry, DataDog)
- [ ] Enable rate limiting in production
- [ ] Configure backup strategy

---

## Troubleshooting

### Common Issues

**CORS Error**
```typescript
// In app.module.ts, update CORS
app.enableCors({
  origin: process.env.FRONTEND_URL, // Your Vercel domain
  credentials: true,
});
```

**Prisma Connection Error**
```bash
# Check DATABASE_URL format
# Add ?sslmode=require for cloud databases
```

**Build Failed**
```bash
# Clear cache and rebuild
cd apps/api
rm -rf node_modules .next dist
npm install
npm run build
```
