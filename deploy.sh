#!/bin/bash
# Deploy LEVERAGE to Vercel

echo "Deploying LEVERAGE to Vercel..."

cd apps/web

echo "Installing Vercel CLI if needed..."
npm install -g vercel 2>/dev/null || true

echo "Deploying web app..."
vercel --prod

echo "Done! Your app is live at the URL shown above."
