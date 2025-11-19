# SmartFarm AI

SmartFarm AI is an intelligent assistant for smallholder farmers that combines real-time weather insights, crop advisories, AI-powered pest detection (placeholder), irrigation guidance, market price trends, fertilizer tips, and alerts in one cohesive experience.

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Recharts, i18next
- **Backend:** Node.js, Express.js, Mongoose, Multer, JWT, express-validator
- **Database:** MongoDB (Atlas or local)

## Project Structure

```
├── backend
│   ├── config/         # Mongo connection
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth + error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── utils/          # Helper utilities
│   ├── uploads/        # Multer upload target
│   └── server.js
├── frontend
│   └── src/
│       ├── components/ # Reusable UI
│       ├── context/    # Auth context
│       ├── pages/      # Route pages
│       ├── services/   # API wrappers
│       ├── i18n.js     # Multi-language bootstrapping
│       └── main.jsx / App.jsx
└── README.md
```

## Backend Setup

```bash
cd backend
npm install
cp env.example .env          # or manually create .env
npm run dev                  # or npm start for production
```

Environment variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartfarm_ai
JWT_SECRET=supersecretkey
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Frontend Setup

```bash
cd frontend
npm install
cp env.example .env          # configure VITE_API_URL
npm run dev
```

Key env var:

```
VITE_API_URL=http://localhost:5000/api
```

## Available API Routes

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/auth/register` | Create a new user                        |
| POST   | `/api/auth/login`    | Login + JWT                              |
| GET    | `/api/auth/me`       | Authenticated profile                    |
| GET    | `/api/weather/today` | Dummy current weather + history          |
| GET    | `/api/market/prices` | Dummy market data                        |
| POST   | `/api/irrigation/suggest` | AI-ready irrigation suggestion    |
| POST   | `/api/pest/detect`   | Multer upload + dummy pest detection     |
| GET    | `/api/advisory/crop` | Crop advisory list                       |
| GET    | `/api/alerts/all`    | Alerts for user / fallback global alerts |

All protected routes expect `Authorization: Bearer <token>`.

## Frontend Features

- Responsive Tailwind UI with navbar, cards, charts, and upload widgets
- JWT auth flow with protected dashboards
- Weather & market charts (Recharts)
- Multi-language toggle (English + placeholder local language)
- Alerts panel, irrigation suggestion form, fertilizer tips, pest detection uploader

## Testing

- Backend: hit `npm run dev` and use tools like Postman to call `/api/health`
- Frontend: `npm run dev` and interact with each page; dummy data renders even without real ML models

## Production Notes

- Replace dummy responses with actual AI models or third-party data feeds
- Configure secure storage (S3, etc.) for image uploads
- Harden validation and add rate limiting/logging for public deployment

Enjoy building with SmartFarm AI! 🚜🌾

