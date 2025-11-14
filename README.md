# SME Training Platform

AI-powered training platform for Kenyan SME founders with multi-channel access (Web, WhatsApp, USSD).

## Features

- 🎓 **Personalized Learning**: AI-powered course recommendations
- 💬 **AI Mentor**: 24/7 business guidance via chat
- 📊 **Investor Readiness Score**: Track your preparedness for funding
- 📱 **Multi-Channel Access**: Web, WhatsApp Bot, and USSD
- 🏆 **Gamification**: Points, badges, and progress tracking
- 🌍 **Localization**: English and Swahili support

## Tech Stack

### Backend
- FastAPI (Python)
- PostgreSQL
- OpenAI/Gemini for AI features
- Africa's Talking (USSD)
- Twilio (WhatsApp)

### Frontend
- React 18
- Tailwind CSS
- Zustand (State Management)
- React Router
- Axios

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis (optional)

### Backend Setup
```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run migrations
alembic upgrade head

# Seed database
python seed_data.py

# Start server
python run.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Using Docker
```bash
docker-compose up -d
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/sme_platform
SECRET_KEY=your-secret-key
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...
AFRICASTALKING_USERNAME=sandbox
AFRICASTALKING_API_KEY=your-key
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## API Documentation

Once running, visit:
- API Docs: http://localhost:8000/docs
- Frontend: http://localhost:3000

## USSD Integration

Test USSD code: `*384*123#`

## WhatsApp Bot

Send messages to configured Twilio WhatsApp number

## Project Structure
```
sme-training-platform/
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utilities
│   ├── alembic/          # Migrations
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── context/      # React context
│   └── package.json
└── docker-compose.yml
```

## Hackathon Alignment

### National Prosperity
- Empowers SME founders with critical business skills
- Supports Kenya's economic engine (SMEs)

### Economic Inclusion
- Accessible via USSD for rural areas
- WhatsApp for mobile-first users
- Free educational content

### AI for Capacity Building
- Personalized learning paths
- AI-powered mentorship
- Investor readiness assessment

## Future Enhancements

- [ ] Mobile apps (iOS/Android)
- [ ] Offline mode
- [ ] Certificate generation
- [ ] Mentor marketplace
- [ ] Investment matching
- [ ] County-level analytics dashboard
- [ ] Integration with banks (KCB, Equity)
- [ ] Partnership with Ajira, KEPSA

## License

MIT License

## Contributors

Built for Kenya SME Empowerment Hackathon 2025

## Support

For support, email info@smeplatform.co.ke
```

**.gitignore**
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
*.egg-info/
.pytest_cache/

# Node
node_modules/
dist/
build/
.env.local
.env.production

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Environment
.env
*.log

# Database
*.db
*.sqlite3

# OS
.DS_Store
Thumbs.db