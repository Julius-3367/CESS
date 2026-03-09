#!/bin/bash

# Start Next.js Frontend for Berit Shalvah

echo "🚀 Starting Berit Shalvah Client Portal..."
echo "==========================================="
echo ""

# Check if node_modules exists
if [ ! -d "/home/julius/CESS/frontend/client-portal/node_modules" ]; then
    echo "❌ node_modules not found"
    echo "Please run: cd frontend/client-portal && npm install"
    exit 1
fi

# Kill any existing process on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "📦 Starting Next.js development server..."
cd /home/julius/CESS/frontend/client-portal

# Start the dev server
npm run dev

echo ""
echo "✅ Frontend started at http://localhost:3000"
