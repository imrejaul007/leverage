# LEVERAGE - Quick Start Guide

## One-Command Setup

Run the setup script to configure everything:

```bash
./setup.sh
```

This will:
- Start PostgreSQL and Redis via Docker
- Create the database schema
- Install dependencies
- Create a demo user

## Manual Setup (if needed)

### 1. Start Services
```bash
# PostgreSQL
docker run -d --name leverage-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=leverage \
  -p 5432:5432 \
  postgres:15-alpine

# Redis
docker run -d --name leverage-redis \
  -p 6379:6379 \
  redis:7-alpine
```

### 2. Configure Environment
```bash
cp apps/api/.env.example apps/api/.env 2>/dev/null || true
# Edit apps/api/.env with your values
```

### 3. Run Migrations
```bash
cd apps/api
npx prisma generate
npx prisma migrate deploy
```

### 4. Start Development
```bash
# Terminal 1: API
cd apps/api && npm run start:dev

# Terminal 2: Web
cd apps/web && npm run dev
```

## Demo Credentials
- **Email:** demo@leverge.one
- **Password:** demo123

## Common Issues

### Port already in use
```bash
# Check what's using the port
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis

# Kill the process or stop the container
docker stop leverage-postgres leverage-redis
```

### Database connection refused
```bash
# Restart containers
docker restart leverage-postgres leverage-redis

# Wait a few seconds and retry
```

### Prisma error
```bash
cd apps/api
npx prisma db push --force-reset  # Reset database
npx prisma generate               # Regenerate client
```
