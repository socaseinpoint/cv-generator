# CV Editor - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites Check

Before starting, make sure you have:

- ✅ Node.js >= 20.0.0 (`node --version`)
- ✅ pnpm >= 8.0.0 (`pnpm --version` or install with `npm install -g pnpm`)
- ✅ Docker Desktop running (`docker --version`)

## Automated Setup (Recommended)

Run the setup script:

```bash
cd cv-app
./scripts/setup.sh
```

This will:
1. Install all dependencies
2. Start PostgreSQL in Docker
3. Create environment files
4. Run database migrations
5. Generate Prisma Client

## Manual Setup

If the script doesn't work, follow these steps:

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Configure API

Create `apps/api/.env`:

```env
DATABASE_URL="postgresql://cvuser:cvpassword@localhost:5432/cvdb"
PORT=3001
HOST=0.0.0.0
```

### 4. Setup Database

```bash
cd apps/api
pnpm prisma migrate dev --name init
pnpm prisma generate
cd ../..
```

## Start Development

```bash
# Start both frontend and backend
pnpm dev:full
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/health

## First Steps

1. Open http://localhost:3000 in your browser
2. Click "New CV" button
3. Enter a title (e.g., "John Doe - Full Stack Developer")
4. Edit the markdown content in the left panel
5. See live preview in the right panel
6. Click "Save" to store in database
7. Select a style (Classic, Modern, or Minimal)
8. Click "Generate PDF" to download

## Common Issues

### Database Connection Error

If you see database errors:
```bash
# Check if PostgreSQL is running
docker ps

# If not, start it
docker compose up -d

# Wait a few seconds and try again
```

### Port Already in Use

If ports 3000, 3001, or 5432 are in use:

**Frontend (3000)**:
- Edit `apps/client/vite.config.ts` and change `port: 3000` to another port

**Backend (3001)**:
- Edit `apps/api/.env` and change `PORT=3001` to another port
- Update proxy in `apps/client/vite.config.ts` to match

**PostgreSQL (5432)**:
- Edit `docker-compose.yml` and change `"5432:5432"` to `"5433:5432"`
- Update DATABASE_URL in `apps/api/.env` to use the new port

### Prisma Client Not Generated

```bash
cd apps/api
pnpm prisma generate
cd ../..
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules apps/*/node_modules
pnpm install
```

## Useful Commands

```bash
# View database in browser
pnpm db:studio

# Stop database
docker compose down

# Reset database (WARNING: deletes all data)
docker compose down -v
docker compose up -d
cd apps/api && pnpm prisma migrate reset

# View API logs
cd apps/api && pnpm dev

# View frontend logs
cd apps/client && pnpm dev
```

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [API endpoints](./README.md#api-endpoints)
- Learn about [PDF styles](./README.md#pdf-styles)
- Explore the codebase structure

## Support

If you encounter issues:

1. Check the terminal for error messages
2. Verify all prerequisites are installed
3. Ensure Docker is running
4. Check if ports are available
5. Review the logs in the terminal

Happy CV creating! 🎉





