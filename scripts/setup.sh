#!/bin/bash

echo "🚀 Setting up CV Editor application..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🐳 Starting PostgreSQL container..."
docker compose up -d

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "📝 Creating .env file for API..."
cat > apps/api/.env << EOF
DATABASE_URL="postgresql://cvuser:cvpassword@localhost:5432/cvdb"
PORT=3001
HOST=0.0.0.0
EOF

echo "🗄️ Running database migrations..."
cd apps/api
pnpm prisma migrate dev --name init
pnpm prisma generate
cd ../..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  pnpm dev:full"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "To view the database:"
echo "  pnpm db:studio"





