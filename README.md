# Lead Tracker

Lead Tracker is a small CRM-style application for managing leads and comments.

- Backend: NestJS, TypeORM, PostgreSQL
- Frontend: Next.js
- API docs: Swagger

## Local Run

### Backend

The backend runs on `http://localhost:3000`.

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

For local backend development, PostgreSQL must be available and match the values in `backend/.env`.

### Frontend

The frontend runs on `http://localhost:3001`.

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Docker Run

From the `docker` directory:

```bash
cd docker
docker compose up --build
```

Services:

- Web: `http://localhost:3001`
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`
- PostgreSQL: `localhost:5432`

To stop containers:

```bash
docker compose down
```

## Environment Variables

### Backend

Example file: `backend/.env.example`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=crm
NODE_ENV=development
```

Keys:

- `DB_HOST` - PostgreSQL host. Use `localhost` locally, `postgres` inside Docker.
- `DB_PORT` - PostgreSQL port.
- `DB_USERNAME` - PostgreSQL username used by TypeORM.
- `DB_PASSWORD` - PostgreSQL password.
- `DB_NAME` - PostgreSQL database name.
- `NODE_ENV` - runtime mode, for example `development` or `production`.

### Frontend

Example file: `frontend/.env.example`

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Keys:

- `NEXT_PUBLIC_API_URL` - public API base URL used by the Next.js app.

## API Check

Local API base URL:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api/docs
```

### Get Leads

```bash
curl "http://localhost:3000/api/leads?page=1&limit=10"
```

Optional query params:

- `page`
- `limit`
- `status`
- `q`
- `sort`
- `order`

### Create Lead

```bash
curl -X POST "http://localhost:3000/api/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "company": "ABC Inc.",
    "status": "new",
    "value": 1000,
    "notes": "Interested in our product"
  }'
```

Available lead statuses:

- `new`
- `contacted`
- `in_progress`
- `won`
- `lost`

### Add Comment

Replace `1` with an existing lead id.

```bash
curl -X POST "http://localhost:3000/api/leads/1/comments" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Called the lead and scheduled a follow-up."
  }'
```

## Production Build

### Backend

```bash
cd backend
npm install
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm start
```

### Docker Production-like Run

```bash
cd docker
docker compose up --build -d
```

