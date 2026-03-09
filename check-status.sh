#!/bin/bash

# Check status of Berit Shalvah services

echo "🔍 Berit Shalvah System Status Check"
echo "====================================="
echo ""

# Check PostgreSQL
echo "📊 Database:"
if systemctl is-active --quiet postgresql; then
    echo "  ✅ PostgreSQL: Running"
    DB_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='berit_shalvah'" 2>/dev/null || echo "0")
    if [ "$DB_EXISTS" = "1" ]; then
        echo "  ✅ Database: berit_shalvah exists"
    else
        echo "  ❌ Database: berit_shalvah not found"
    fi
else
    echo "  ❌ PostgreSQL: Not running"
fi

echo ""
echo "🌐 Services:"

# Check Django API (port 4000)
if lsof -i:4000 >/dev/null 2>&1; then
    echo "  ✅ Django API: Running on http://localhost:4000"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/ 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo "     Status: Responding (HTTP $HTTP_CODE)"
    else
        echo "     Status: Not responding (HTTP $HTTP_CODE)"
    fi
else
    echo "  ❌ Django API: Not running on port 4000"
fi

# Check Frontend (port 3000)
if lsof -i:3000 >/dev/null 2>&1; then
    echo "  ✅ Frontend: Running on http://localhost:3000"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo "     Status: Responding (HTTP $HTTP_CODE)"
    else
        echo "     Status: Not responding (HTTP $HTTP_CODE)"
    fi
else
    echo "  ❌ Frontend: Not running on port 3000"
fi

echo ""
echo "📂 Logs:"
if [ -f "/tmp/berit-api.log" ]; then
    echo "  API log: /tmp/berit-api.log (last 5 lines)"
    tail -5 /tmp/berit-api.log | sed 's/^/    /'
else
    echo "  API log: Not found"
fi

echo ""
if [ -f "/tmp/berit-frontend.log" ]; then
    echo "  Frontend log: /tmp/berit-frontend.log (last 5 lines)"
    tail -5 /tmp/berit-frontend.log | sed 's/^/    /'
else
    echo "   Frontend log: Not found"
fi

echo ""
echo "💡 Quick commands:"
echo "  Start all:      ./start-all.sh"
echo "  Start API:      ./start-django.sh"
echo "  Start frontend: ./start-frontend.sh"
echo "  Stop API:       lsof -ti:4000 | xargs kill -9"
echo "  Stop frontend:  lsof -ti:3000 | xargs kill -9"
