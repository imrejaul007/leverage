# LEVERAGE Trade OS - Deployment Guide

## All Subdomains

| Subdomain | App Path | Description |
|-----------|----------|-------------|
| leverage.com | apps/web | Main website & landing page |
| marketplace.leverage.com | apps/marketplace | Product marketplace |
| docs.leverage.com | apps/docs | Trade document generator |
| freight.leverage.com | apps/freight | Logistics & shipping |
| compliance.leverage.com | apps/compliance | HS codes & duty calculator |
| billing.leverage.com | apps/billing | Invoicing & payments |
| ads.leverage.com | apps/ads | Trade advertising |
| ai.leverage.com | apps/ai | HOJAI AI assistant |

---

## Option 1: Deploy All to Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy Each Subdomain

**Main Site (leverage.com):**
```bash
cd apps/web
vercel --prod
```
When prompted for project name, enter: `leverage-web`

**Marketplace (marketplace.leverage.com):**
```bash
cd apps/marketplace
vercel --prod
```
Project name: `leverage-marketplace`

**Docs (docs.leverage.com):**
```bash
cd apps/docs
vercel --prod
```
Project name: `leverage-docs`

**Freight (freight.leverage.com):**
```bash
cd apps/freight
vercel --prod
```
Project name: `leverage-freight`

**Compliance (compliance.leverage.com):**
```bash
cd apps/compliance
vercel --prod
```
Project name: `leverage-compliance`

**Billing (billing.leverage.com):**
```bash
cd apps/billing
vercel --prod
```
Project name: `leverage-billing`

**Ads (ads.leverage.com):**
```bash
cd apps/ads
vercel --prod
```
Project name: `leverage-ads`

**AI (ai.leverage.com):**
```bash
cd apps/ai
vercel --prod
```
Project name: `leverage-ai`

### Step 4: Configure Domain Aliases in Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select each project
3. Go to **Settings** → **Domains**
4. Add your subdomain:
   - `marketplace.leverage.com` → `leverage-marketplace` project
   - `docs.leverage.com` → `leverage-docs` project
   - etc.

### Step 5: Configure DNS Records

Add these CNAME records in your DNS provider (e.g., Cloudflare):

```
Type    Name    Value
CNAME   marketplace  cname.vercel-dns.com
CNAME   docs         cname.vercel-dns.com
CNAME   freight      cname.vercel-dns.com
CNAME   compliance   cname.vercel-dns.com
CNAME   billing      cname.vercel-dns.com
CNAME   ads          cname.vercel-dns.com
CNAME   ai           cname.vercel-dns.com
```

---

## Option 2: Deploy from GitHub (CI/CD)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: complete LEVERAGE Trade OS with all subdomains"
git push origin main
```

### Step 2: Import Projects to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import each app from GitHub:
   - Select `imrejaul007/leverage` repo
   - Set root directory to `apps/marketplace`, `apps/docs`, etc.
   - Set build command: `npm run build`
   - Set output directory: `.next`

### Step 3: Connect Custom Domains

In each project settings, add the subdomain and verify.

---

## Option 3: Local Development

### Run All Apps Locally

Each app can be run independently:

```bash
# Main website
cd apps/web && npm run dev
# → http://localhost:3000

# Marketplace
cd apps/marketplace && npm run dev
# → http://localhost:3001 (or next available port)

# Documents
cd apps/docs && npm run dev
# → http://localhost:3002

# Freight
cd apps/freight && npm run dev
# → http://localhost:3003

# Compliance
cd apps/compliance && npm run dev
# → http://localhost:3004

# Billing
cd apps/billing && npm run dev
# → http://localhost:3005

# Ads
cd apps/ads && npm run dev
# → http://localhost:3006

# AI
cd apps/ai && npm run dev
# → http://localhost:3007
```

### Quick Start Script

Create a `start-all.sh` script:
```bash
#!/bin/bash
cd apps/web && npm run dev &
cd apps/marketplace && npm run dev &
cd apps/docs && npm run dev &
cd apps/freight && npm run dev &
cd apps/compliance && npm run dev &
cd apps/billing && npm run dev &
cd apps/ads && npm run dev &
cd apps/ai && npm run dev &
wait
```

---

## Environment Variables

Create `.env.local` in each app with:

```
# For all apps
NEXT_PUBLIC_APP_URL=https://leverage.com
NEXT_PUBLIC_API_URL=https://api.leverage.com
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Domain Not Working
1. Check DNS propagation (can take up to 48 hours)
2. Verify CNAME records are correct
3. Check Vercel domain verification status

### Port Already in Use
```bash
# Find and kill process using port
lsof -i :3000
kill -9 <PID>
```

---

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)