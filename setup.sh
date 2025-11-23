#!/bin/bash

# Política Argentina - Automated Setup Script
# This script sets up the development environment

set -e  # Exit on error

echo "🚀 Política Argentina - Automated Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check Node.js
echo -e "${BLUE}📦 Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 3: Setup environment
echo -e "${BLUE}🔧 Setting up environment variables...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Created .env file from template${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env with your database credentials${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi
echo ""

# Step 4: Ask for database setup
echo -e "${BLUE}🗄️  Database Setup${NC}"
echo "Which database would you like to use?"
echo "1) SQLite (recommended for development)"
echo "2) PostgreSQL (production)"
read -p "Enter choice [1-2]: " DB_CHOICE

if [ "$DB_CHOICE" = "1" ]; then
    echo -e "${BLUE}📝 Configuring SQLite...${NC}"
    # Update .env with SQLite
    sed -i '' 's|DATABASE_URL=.*|DATABASE_URL="file:./dev.db"|' .env 2>/dev/null || \
    sed -i 's|DATABASE_URL=.*|DATABASE_URL="file:./dev.db"|' .env
    
    # Update schema
    if [ -f prisma/schema.sqlite.prisma ]; then
        cp prisma/schema.sqlite.prisma prisma/schema.prisma
        echo -e "${GREEN}✅ SQLite schema configured${NC}"
    fi
elif [ "$DB_CHOICE" = "2" ]; then
    echo -e "${YELLOW}⚠️  PostgreSQL requires manual configuration${NC}"
    echo "Please update DATABASE_URL in .env with your PostgreSQL connection string"
    
    # Update schema
    if [ -f prisma/schema.postgresql.prisma ]; then
        cp prisma/schema.postgresql.prisma prisma/schema.prisma
        echo -e "${GREEN}✅ PostgreSQL schema configured${NC}"
    fi
fi
echo ""

# Step 5: Generate Prisma Client
echo -e "${BLUE}🔄 Generating Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"
echo ""

# Step 6: Run migrations
echo -e "${BLUE}🗄️  Running database migrations...${NC}"
npx prisma migrate dev --name init
echo -e "${GREEN}✅ Migrations complete${NC}"
echo ""

# Step 7: Seed database
read -p "Would you like to seed the database with sample data? [y/N]: " SEED_CHOICE
if [ "$SEED_CHOICE" = "y" ] || [ "$SEED_CHOICE" = "Y" ]; then
    echo -e "${BLUE}🌱 Seeding database...${NC}"
    npx tsx prisma/seed.ts
    echo -e "${GREEN}✅ Database seeded${NC}"
fi
echo ""

# Step 8: Create uploads directory
echo -e "${BLUE}📁 Creating directories...${NC}"
mkdir -p public/uploads
echo -e "${GREEN}✅ Directories created${NC}"
echo ""

# Success message
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                       ║${NC}"
echo -e "${GREEN}║   ✨ Setup Complete! ✨              ║${NC}"
echo -e "${GREEN}║                                       ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}🚀 Next steps:${NC}"
echo ""
echo "1. Review and update .env file if needed"
echo "2. Start the development server:"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo "3. Open your browser to:"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "4. Login with default credentials:"
echo -e "   Email: ${YELLOW}admin@politica.com.ar${NC}"
echo -e "   Password: ${YELLOW}admin123${NC}"
echo ""
echo -e "${RED}⚠️  Remember to change the admin password!${NC}"
echo ""
echo "📖 For more information, check:"
echo "   - README.md"
echo "   - docs/guides/PROJECT_SUMMARY.md"
echo "   - docs/deployment/"
echo ""
echo "Happy coding! 🎉"
