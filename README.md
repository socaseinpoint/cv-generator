# CV Editor - Monorepo Application

A full-stack CV editor with React frontend and Fastify backend. Create, edit, and generate professional CVs in markdown with 3 different PDF styles.

## Features

- 📝 **Markdown Editor** - Write your CV in markdown with live preview
- 🎨 **3 PDF Styles** - Classic, Modern (dark sidebar), and Minimal designs
- 💾 **Database Storage** - Store multiple CVs in PostgreSQL
- 🚀 **Modern Stack** - React 18, Fastify, Prisma, TanStack Query
- 📦 **Monorepo** - Organized with Turborepo and pnpm workspaces

## Project Structure

```
cv-app/
├── apps/
│   ├── api/          # Fastify backend with Prisma
│   └── client/       # React frontend with Vite
├── packages/         # Shared packages (if needed)
├── prisma/           # Database schema
└── docker-compose.yml # PostgreSQL container
```

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Docker (for PostgreSQL)

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Database

```bash
docker compose up -d
```

This starts PostgreSQL on `localhost:5432` with:
- Database: `cvdb`
- User: `cvuser`
- Password: `cvpassword`

### 3. Setup Database

Create `.env` file in `apps/api/`:

```env
DATABASE_URL="postgresql://cvuser:cvpassword@localhost:5432/cvdb"
PORT=3001
HOST=0.0.0.0
```

Then run migrations:

```bash
cd apps/api
pnpm prisma migrate dev --name init
pnpm prisma generate
cd ../..
```

### 4. Start Development Servers

```bash
# Start both API and Client
pnpm dev:full

# Or start separately
pnpm dev:api    # API on http://localhost:3001
pnpm dev:client # Client on http://localhost:3000
```

## Available Scripts

### Root Level

- `pnpm dev` - Start all apps in parallel
- `pnpm dev:full` - Start API and Client together
- `pnpm dev:api` - Start only API server
- `pnpm dev:client` - Start only Client app
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all apps
- `pnpm db:generate` - Generate Prisma Client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Prisma Studio

## API Endpoints

### CV Operations

- `POST /api/cv` - Create new CV
  ```json
  {
    "title": "John Doe - Full Stack Developer",
    "markdownContent": "# John Doe\n..."
  }
  ```

- `GET /api/cv` - List all CVs (without content)

- `GET /api/cv/:id` - Get specific CV with content

- `PUT /api/cv/:id` - Update CV
  ```json
  {
    "title": "Updated Title",
    "markdownContent": "Updated content..."
  }
  ```

- `DELETE /api/cv/:id` - Delete CV

### PDF Generation

- `POST /api/cv/:id/generate` - Generate PDF
  ```json
  {
    "style": "classic" | "modern" | "minimal"
  }
  ```
  Returns PDF file as blob

## PDF Styles

1. **Classic** - Professional style with orange accent border, grid layout
2. **Modern** - Dark sidebar with skills, main content on the right
3. **Minimal** - Clean serif headers, centered title, minimalist design

## Technology Stack

### Backend
- **Fastify** - Fast web framework
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Database
- **Puppeteer** - PDF generation
- **Zod** - Schema validation
- **marked** - Markdown parser

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## Development

### Adding New CV Fields

1. Update Prisma schema in `apps/api/prisma/schema.prisma`
2. Run `pnpm db:migrate`
3. Update TypeScript types in `apps/client/src/api/client.ts`
4. Update UI components as needed

### Adding New PDF Styles

1. Add new style to `apps/api/src/styles.ts`
2. Update `StyleType` type
3. Update style selector in frontend

## Production Build

```bash
# Build all apps
pnpm build

# Start API in production
cd apps/api
pnpm start

# Serve client static files
cd apps/client
pnpm preview
```

## Environment Variables

### API (.env in apps/api/)

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
PORT=3001
HOST=0.0.0.0
NODE_ENV=production
```

### Client

No environment variables needed. API proxy is configured in `vite.config.ts` for development.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request





