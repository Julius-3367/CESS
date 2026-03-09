# Berit Shalvah Financial Services - Microlending System

**Integrity. Access. Growth** | Where Vision Meets Responsible Capital

## Project Overview

A comprehensive microlending and financial management system for Berit Shalvah Financial Services Ltd, featuring:

- 🌐 **Client Portal** - Modern Next.js web application for loan applications and management
- 💼 **Customer Portal** - Django-based interface for customers
- 🔌 **REST API** - Django REST Framework API for all operations
- 📊 **KYC Management** - Complete identity verification workflow
- 💰 **Loan Management** - Application, approval, and repayment tracking
- ✉️ **Automated Workflows** - Guarantor signing, notifications, reminders

## Architecture

### Frontend Stack
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod validation
- **File Upload**: Drag-and-drop with preview
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

### Backend Stack
- **Framework**: Django 5.0.2 + Django REST Framework 3.14.0
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL 14+
- **API Documentation**: REST API with comprehensive endpoints
- **File Storage**: Media files with organized structure
- **Email**: SendGrid integration
- **SMS**: Africa's Talking API

### Database
- **PostgreSQL**: Primary database (berit_shalvah)
- **User Management**: Django built-in User model with extensions
- **KYC Documents**: Organized media storage with date-based structure
- **Loan Records**: Complete loan lifecycle tracking

## Design Colors

Elegant and professional color scheme for financial trust:

- **Rose Red**: `#DC2626` - Primary CTA, accents
- **Deep Rose**: `#BE123C` - Hover states, headers
- **Soft Pink**: `#FCE7F3` - Backgrounds, highlights
- **Gold**: `#F59E0B` - Success, approved states
- **Navy Blue**: `#1E3A8A` - Trust, professionalism
- **Slate**: `#64748B` - Text, borders

## Project Structure

```
CESS/
├── api-django/              # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── berit_api/          # Main Django project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── authentication/     # User auth & JWT
│   ├── loans/              # Loan management
│   ├── kyc/                # KYC verification
│   ├── guarantors/         # Guarantor workflow
│   ├── customer_portal/    # Customer web interface
│   └── media/              # Uploaded documents
├── frontend/
│   └── client-portal/      # Next.js client application
├── odoo-custom/            # Custom Odoo modules (future)
│   └── berit_loan/
├── docs/                   # Technical documentation
└── *.sh                    # Setup and start scripts
```

## Installation & Setup

### Prerequisites
- Python 3.10+
- PostgreSQL 14+
- Node.js 18+
- npm or yarn
- Git

### Quick Start (Recommended)

#### 1. Setup Django API (First Time Only)
```bash
cd /home/julius/CESS
chmod +x setup-django.sh
./setup-django.sh
```

This script will:
- Create Python virtual environment
- Install all dependencies
- Setup PostgreSQL database
- Run migrations
- Create Django superuser (optional)

#### 2. Setup Frontend (First Time Only)
```bash
cd frontend/client-portal
npm install
cp .env.example .env.local
# Edit .env.local if needed (defaults should work)
```

#### 3. Start Everything
```bash
# Start both services at once
./start-all.sh

# OR start individually:
./start-django.sh    # Django API on port 4000
./start-frontend.sh  # Next.js on port 3000
```

#### 4. Check System Status
```bash
./check-status.sh
```

#### 5. Access the System
- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000
- **Django Admin**: http://localhost:4000/admin

**Note**: If you see Google Fonts timeout warnings in the frontend, you can safely ignore them - the system uses fallback fonts.

### Manual Setup

#### Backend (Django API)
```bash
cd api-django
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup database
sudo -u postgres psql << EOF
CREATE DATABASE berit_shalvah;
CREATE USER berit_user WITH PASSWORD 'admin1234';
GRANT ALL PRIVILEGES ON DATABASE berit_shalvah TO berit_user;
ALTER USER berit_user CREATEDB;
EOF

# Run migrations
python manage.py migrate
python manage.py createsuperuser  # Optional

# Start server
python manage.py runserver 0.0.0.0:4000
```

#### Frontend (Next.js)
```bash
cd frontend/client-portal
npm install
npm run dev
```
## Features

### ✅ Implemented Features

#### Authentication & User Management
- User registration with validation
- JWT-based authentication
- Login/logout functionality
- Token refresh mechanism
- Password reset capability
- User profile management

#### KYC Management
- Multi-step KYC submission
- Document upload (ID, passport, proof of address)
- File validation (<5MB, PDF/JPG/PNG)
- KYC status tracking
- Admin approval workflow
- Management command for batch approval

#### Loan Management
- Loan application submission
- Dynamic interest rate calculation (6-tier system)
- Loan calculator with repayment schedules
- Loan status tracking
- Loan listing and details
- Repayment schedule generation

#### Customer Portal
- Dashboard with loan overview
- KYC status display
- Loan application interface
- Document management
- Profile management

### 📋 Planned Features
- Guarantor email workflow
- M-Pesa payment integration
- SMS notifications (Africa's Talking)
- Email notifications (SendGrid)
- Advanced reporting and analytics
- Credit scoring integration
- Odoo ERP integration

## API Endpoints

### Authentication (`/api/auth/`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/token/refresh` - Refresh JWT token
- `POST /api/auth/password-reset` - Request password reset

### KYC (`/api/kyc/`)
- `POST /api/kyc/submit` - Submit KYC documents
- `GET /api/kyc/status` - Check KYC verification status
- `GET /api/kyc/` - List user's KYC submissions
- `PUT /api/kyc/<id>/` - Update KYC information

### Loans (`/api/loans/`)
- `POST /api/loans/apply` - Submit loan application
- `GET /api/loans/` - List user's loans
- `GET /api/loans/<id>/` - Get loan details
- `POST /api/loans/calculator` - Calculate loan repayment
- `GET /api/loans/<id>/schedule` - Get repayment schedule

### Customer Portal (`/portal/`)
- `GET /portal/` - Landing page
- `GET /portal/dashboard` - User dashboard
- `GET /portal/loans` - Loan list
- `GET /portal/kyc` - KYC status and submission

### Admin (`/admin/`)
- Django admin interface for system management

For detailed API documentation and request/response examples, see [TESTING_GUIDE.md](TESTING_GUIDE.md).

## Environment Variables

### Django API (api-django/.env)
```env
# Django Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=berit_shalvah
DB_USER=berit_user
DB_PASSWORD=admin1234
DB_HOST=localhost
DB_PORT=5432

# JWT Settings
JWT_ACCESS_TOKEN_LIFETIME=60  # minutes
JWT_REFRESH_TOKEN_LIFETIME=1440  # 24 hours

# Email Configuration (Optional)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=your_sendgrid_api_key
DEFAULT_FROM_EMAIL=noreply@beritshalvah.co.ke

# SMS Configuration (Optional)
AFRICASTALKING_USERNAME=your_username
AFRICASTALKING_API_KEY=your_api_key

# File Upload
MAX_UPLOAD_SIZE=5242880  # 5MB
ALLOWED_EXTENSIONS=pdf,jpg,jpeg,png
```

### Frontend (frontend/client-portal/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME=Berit Shalvah Financial Services
```

## Testing

### Manual Testing
See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing workflows.

### Quick API Tests
```bash
# Register a new user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123!",
    "full_name": "Test User",
    "phone": "+254712345678",
    "id_number": "12345678"
  }'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "SecurePass123!"
  }'

# Calculate loan
curl -X POST http://localhost:4000/api/loans/calculator \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "duration_months": 12
  }'
```

### Django Tests
```bash
cd api-django
source venv/bin/activate
python manage.py test
```

## KYC Management

### Approve KYC Via Command Line
```bash
# Approve specific KYC by ID
./approve-kyc.sh 1

# Or manually
cd api-django
source venv/bin/activate
python manage.py approve_kyc --kyc-id 1
```

## Useful Commands

### Django Management
```bash
cd api-django
source venv/bin/activate

# Create superuser
python manage.py createsuperuser

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic

# Shell access
python manage.py shell
```

### Database Management
```bash
# Backup database
pg_dump berit_shalvah > backup_$(date +%Y%m%d).sql

# Restore database
psql berit_shalvah < backup_20260309.sql

# Access database
psql -U berit_user -d berit_shalvah
```

## Security Features

- 🔒 JWT-based authentication with access/refresh tokens
- 🔐 Password hashing with Django's built-in security
- 📝 Secure file upload with validation
- 🛡️ CSRF protection enabled
- 🚨 CORS configuration for API access
- 📊 User activity tracking
- 🔍 File type and size validation

## Deployment

### Production Checklist
- [ ] Set `DEBUG=False` in Django settings
- [ ] Configure production SECRET_KEY
- [ ] Setup SSL certificates (Let's Encrypt)
- [ ] Configure production database with backups
- [ ] Setup Gunicorn/uWSGI for Django
- [ ] Configure Nginx as reverse proxy
- [ ] Enable firewall (UFW)
- [ ] Setup monitoring (optional)
- [ ] Configure email and SMS services
- [ ] Collect static files
- [ ] Test all API endpoints
- [ ] Setup automatic backups

### Production Server Requirements
- **VPS**: 4 GB RAM, 2 CPU Cores, 80 GB SSD (minimum)
- **OS**: Ubuntu 22.04 LTS
- **Database**: PostgreSQL 14+
- **Web Server**: Nginx
- **WSGI Server**: Gunicorn
- **SSL**: Let's Encrypt (free)

### Production Deployment
```bash
# Install production dependencies
pip install gunicorn whitenoise

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

# Start with Gunicorn
gunicorn berit_api.wsgi:application --bind 0.0.0.0:4000 --workers 3
```

## Documentation

- **[COMMANDS.md](COMMANDS.md)** - Quick command reference
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - API testing workflows
- **[ROADMAP.md](ROADMAP.md)** - Development roadmap
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture

## Available Scripts

- `./start-all.sh` - Start both Django API and Frontend
- `./start-django.sh` - Start Django API only
- `./start-frontend.sh` - Start Next.js frontend only
- `./check-status.sh` - Check system status
- `./setup-django.sh` - Initial Django setup
- `./approve-kyc.sh <id>` - Approve KYC submission

## Troubleshooting

### Django API won't start
```bash
# Check PostgreSQL
sudo systemctl status postgresql
sudo systemctl start postgresql

# Check Python environment
cd api-django
source venv/bin/activate
which python

# Check database connection
psql -U berit_user -d berit_shalvah
```

### Port already in use
```bash
# Kill process on port 4000 (Django)
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9
```

### Frontend not loading (localhost:3000)
```bash
# Check if frontend is in correct directory
cd /home/julius/CESS/frontend/client-portal

# Reinstall dependencies
rm -rf node_modules .next
npm install
npm run dev
```

**Google Fonts Warning**: If you see "Failed to download Poppins from Google Fonts" - this is harmless. The system will use fallback fonts and still work perfectly.

### Database migration issues
```bash
cd api-django
source venv/bin/activate
python manage.py showmigrations
python manage.py migrate --fake-initial
```

### Check System Status
```bash
./check-status.sh  # See what's running
```

## Support & Contact

**Email**: beritfinance@gmail.com  
**Location**: Kiambu County, Kenya  
**Developer**: Softlink Options - Technology Solutions

## License

© 2026 Berit Shalvah Financial Services Ltd. All Rights Reserved.

---

**Built with ❤️ for financial inclusion in Kenya**
