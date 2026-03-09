#!/bin/bash

# Start complete Berit Shalvah system
# Frontend + Django API + Odoo

echo "🚀 Starting Berit Shalvah Financial Services System"
echo "==================================================="
echo ""

# Function to check if port is in use
check_port() {
    lsof -i:$1 >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

# PostgreSQL
if systemctl is-active --quiet postgresql; then
    echo "✅ PostgreSQL is running"
else
    echo "❌ PostgreSQL is not running"
    echo "Start: sudo systemctl start postgresql"
    exit 1
fi

# Check if database exists
DB_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='berit_shalvah'" 2>/dev/null || echo "0")
if [ "$DB_EXISTS" = "1" ]; then
    echo "✅ Database exists"
else
    echo "⚠️  Creating database..."
    sudo -u postgres createdb berit_shalvah 2>/dev/null || true
fi

echo ""
echo "🌐 Starting services..."
echo ""

# Start Django API (port 4000)
if ! check_port 4000; then
    echo "🐍 Starting Django API on port 4000..."
    cd /home/julius/CESS/api-django
    source venv/bin/activate
    python manage.py runserver 0.0.0.0:4000 > /tmp/berit-api.log 2>&1 &
    API_PID=$!
    echo "✅ Django API started (PID: $API_PID)"
else
    echo "⚠️  Port 4000 already in use"
fi

sleep 2

# Start Frontend (port 3000)
if ! check_port 3000; then
    echo "🎨 Starting Frontend on port 3000..."
    cd /home/julius/CESS/frontend/client-portal
    npm run dev > /tmp/berit-frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
else
    echo "⚠️  Port 3000 already in use"
fi

echo ""
echo "🎉 System started successfully!"
echo ""
echo "📍 Access your system:"
echo "   Frontend:  http://localhost:3000"
echo "   API:       http://localhost:4000"
echo "   API Docs:  http://localhost:4000/admin"
echo ""
echo "📋 View logs:"
echo "   API:       tail -f /tmp/berit-api.log"
echo "   Frontend:  tail -f /tmp/berit-frontend.log"
echo ""
echo "🛑 To stop all services:"
echo "   killall python node || kill $API_PID $FRONTEND_PID"
echo ""
echo "Note: Odoo should be started separately if needed"
echo "      cd /opt/odoo && ./odoo-bin -c odoo.conf"
echo ""
