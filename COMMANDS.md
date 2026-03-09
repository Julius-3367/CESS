# Quick Reference - Berit Shalvah System Commands

## 🚀 Starting Services

### Start Everything
```bash
./start-all.sh
```

### Start Individual Services
```bash
# Django API (port 4000)
./start-django.sh

# Frontend (port 3000)
./start-frontend.sh

# Or manually from the correct directory
cd api-django && source venv/bin/activate && python manage.py runserver 0.0.0.0:4000
cd frontend/client-portal && npm run dev
```

## 🔍 Check Status
```bash
./check-status.sh
```

## 🛑 Stop Services

### Kill specific ports
```bash
# Stop Django API
lsof -ti:4000 | xargs kill -9

# Stop Frontend
lsof -ti:3000 | xargs kill -9

# Stop both
lsof -ti:4000,3000 | xargs kill -9
```

## 📍 Access Points

- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000
- **Django Admin**: http://localhost:4000/admin
- **Customer Portal**: http://localhost:4000/portal

## 📋 Common Issues & Fixes

### Port Already in Use
```bash
# Error: That port is already in use
lsof -ti:4000 | xargs kill -9  # Kill process on port 4000
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
```

### Frontend Not Loading (localhost:3000)
```bash
cd frontend/client-portal
npm install  # Reinstall dependencies if needed
npm run dev
```

Note: Google Fonts warnings can be ignored - they're just network timeouts for the Poppins font. The system will use fallback fonts.

### Database Issues
```bash
# Check PostgreSQL
sudo systemctl status postgresql
sudo systemctl start postgresql

# Check if database exists
psql -U berit_user -d berit_shalvah -c "\dt"
```

### Virtual Environment Issues
```bash
cd api-django
source venv/bin/activate  # Activate venv
which python  # Should show venv/bin/python
```

## 🧪 Testing

### Test API Endpoints
```bash
# Test calculator
curl "http://localhost:4000/api/loans/calculator?amount=100000&months=12"

# Test registration
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"Test123!","full_name":"Test User","phone":"+254712345678","id_number":"12345678"}'
```

### Check Logs
```bash
# API logs (if started with start-all.sh)
tail -f /tmp/berit-api.log

# Frontend logs
tail -f /tmp/berit-frontend.log
```

## 📊 Database Management

```bash
# Create superuser
cd api-django && source venv/bin/activate
python manage.py createsuperuser

# Run migrations
python manage.py migrate

# Approve KYC
./approve-kyc.sh <kyc_id>
```

## 🔧 Development Commands

```bash
# Django shell
cd api-django && source venv/bin/activate
python manage.py shell

# Check for errors
python manage.py check

# Collect static files
python manage.py collectstatic
```

## 📦 Installation (First Time)

```bash
# Setup Django
./setup-django.sh

# Setup Frontend  
cd frontend/client-portal
npm install
```

## 💡 Pro Tips

1. Always start Django API before the frontend
2. Use `./check-status.sh` to verify both services are running
3. If you see Google Fonts errors in frontend - ignore them (fallback fonts work fine)
4. Django security warnings in development are normal (DEBUG=True)
5. Use `lsof -ti:<port>` to find processes using a specific port

---

**Need Help?** Check the main [README.md](README.md) for detailed documentation.
