#!/bin/bash

# ============================================
# LEVERAGE Setup Script
# ============================================
# Run this script to set up the complete development environment
# Prerequisites: Docker Desktop installed

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  LEVERAGE Development Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Check for Docker
echo -e "${YELLOW}Step 1: Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker Desktop first.${NC}"
    echo "Download: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}Docker is not running. Please start Docker Desktop.${NC}"
    exit 1
fi
echo -e "${GREEN}Docker is running!${NC}"
echo ""

# Step 2: Create .env file
echo -e "${YELLOW}Step 2: Setting up environment variables...${NC}"

if [ ! -f apps/api/.env ]; then
    cat > apps/api/.env << 'EOF'
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/leverage"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="leverage-dev-secret-change-in-production"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# OpenAI (optional)
OPENAI_API_KEY=""

# Email (optional - for development, emails are logged to console)
SMTP_HOST="smtp.ethereal.email"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM="noreply@leverge.one"

# App
API_PORT="3001"
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3000"
EOF
    echo -e "${GREEN}Created apps/api/.env${NC}"
else
    echo -e "${YELLOW}apps/api/.env already exists, skipping...${NC}"
fi

if [ ! -f apps/web/.env.local ]; then
    cat > apps/web/.env.local << 'EOF'
# API
NEXT_PUBLIC_API_URL="http://localhost:3001"
EOF
    echo -e "${GREEN}Created apps/web/.env.local${NC}"
else
    echo -e "${YELLOW}apps/web/.env.local already exists, skipping...${NC}"
fi
echo ""

# Step 3: Start PostgreSQL and Redis
echo -e "${YELLOW}Step 3: Starting PostgreSQL and Redis with Docker Compose...${NC}"
docker compose up -d postgres redis 2>/dev/null || docker-compose up -d postgres redis

echo ""

# Step 4: Wait for services
echo -e "${YELLOW}Step 4: Waiting for services to be ready...${NC}"
echo -n "PostgreSQL"
for i in {1..30}; do
    if docker exec leverage-postgres pg_isready -U postgres &>/dev/null; then
        echo -e " ${GREEN}✓${NC}"
        break
    fi
    echo -n "."
    sleep 1
done

echo -n "Redis"
for i in {1..15}; do
    if docker exec leverage-redis redis-cli ping &>/dev/null; then
        echo -e " ${GREEN}✓${NC}"
        break
    fi
    echo -n "."
    sleep 1
done
echo ""

# Step 5: Run Prisma migrations
echo -e "${YELLOW}Step 5: Running Prisma migrations...${NC}"
cd apps/api
npx prisma generate 2>/dev/null
npx prisma migrate deploy
cd ../..
echo -e "${GREEN}Database schema deployed!${NC}"
echo ""

# Step 6: Install dependencies
echo -e "${YELLOW}Step 6: Installing dependencies...${NC}"
npm install 2>/dev/null
cd apps/api && npm install 2>/dev/null && cd ../..
cd apps/web && npm install 2>/dev/null && cd ../..
echo -e "${GREEN}Dependencies installed!${NC}"
echo ""

# Step 7: Create demo user
echo -e "${YELLOW}Step 7: Creating demo user...${NC}"
cd apps/api
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createDemoUser() {
    const hashedPassword = await bcrypt.hash('demo123', 10);
    try {
        await prisma.user.upsert({
            where: { email: 'demo@leverge.one' },
            update: {},
            create: {
                email: 'demo@leverge.one',
                password: hashedPassword,
                firstName: 'Demo',
                lastName: 'User',
                role: 'BUYER',
                isEmailVerified: true
            }
        });
        console.log('Demo user created: demo@leverge.one / demo123');
    } catch (e) {
        console.log('Demo user may already exist');
    }
}
createDemoUser().finally(() => prisma.\$disconnect());
" 2>/dev/null
cd ../..
echo ""

# ============================================
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo -e "1. Start the API server:"
echo -e "   ${YELLOW}cd apps/api && npm run start:dev${NC}"
echo ""
echo -e "2. In another terminal, start the web app:"
echo -e "   ${YELLOW}cd apps/web && npm run dev${NC}"
echo ""
echo -e "3. Open your browser:"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo -e "4. Login with demo credentials:"
echo -e "   ${YELLOW}Email: demo@leverge.one${NC}"
echo -e "   ${YELLOW}Password: demo123${NC}"
echo ""
echo -e "${RED}Important:${NC} Update JWT_SECRET in apps/api/.env before production!"
echo ""
