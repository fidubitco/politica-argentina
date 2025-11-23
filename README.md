# 🗞️ Politica Argentina - News Portal

A modern, full-stack news portal built with Next.js 15, featuring a premium design, complete authentication system, and database integration.

## ✨ Features

### 🎨 Frontend
- **Award-Winning Design**: Glassmorphism effects, smooth animations with Framer Motion
- **3D Card Interactions**: Interactive news cards with tilt effects
- **Parallax Scrolling**: Engaging hero section with scroll-based animations
- **Responsive Layout**: Mobile-first design with adaptive navigation
- **Dark Mode Support**: Theme toggle with system preference detection

### 🔐 Authentication & Security
- **NextAuth.js Integration**: Secure authentication with Credentials provider
- **Protected Routes**: Middleware-based route protection for admin panel
- **Session Management**: JWT-based sessions with role support
- **API Security**: Protected API endpoints requiring authentication

### 📊 Admin Panel
- **Dashboard**: Analytics overview with Recharts visualizations
- **News Management**: Full CRUD operations for articles
- **Rich Text Editor**: Create and edit articles with live preview
- **Image Upload**: Local file upload system for article images
- **SEO Audit Tool**: Built-in keyword density and readability analysis

### 🗄️ Database & API
- **Prisma ORM**: Type-safe database access
- **SQLite (Dev)**: Fast local development database
- **PostgreSQL (Prod)**: Production-ready database support
- **RESTful API**: Next.js API routes for all operations
- **Zod Validation**: Request/response validation

### 🚀 SEO & Performance
- **JSON-LD Structured Data**: NewsArticle, Organization, WebSite schemas
- **Dynamic Metadata**: Auto-generated meta tags and Open Graph
- **Optimized Build**: Static generation where possible
- **Vercel Deployment**: Production-ready with CI/CD

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fidubitco/politica-argentina.git
   cd politica-argentina
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev --name init
   npx tsx prisma/seed.ts
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Default Credentials

After running the seed script, you can log in with:
- **Email**: `admin@politica.com.ar`
- **Password**: `admin123`

## 📁 Project Structure

```
politica-argentina/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── schema.postgresql.prisma  # Production schema
│   └── seed.ts                # Seed data script
├── public/
│   └── uploads/               # Uploaded images
├── src/
│   ├── app/
│   │   ├── admin/            # Admin panel pages
│   │   ├── api/              # API routes
│   │   ├── login/            # Login page
│   │   ├── noticias/         # Article pages
│   │   └── seccion/          # Category pages
│   ├── components/
│   │   ├── admin/            # Admin components
│   │   ├── home/             # Homepage components
│   │   ├── layout/           # Layout components
│   │   ├── news/             # News components
│   │   └── providers/        # Context providers
│   ├── lib/
│   │   ├── services/         # Business logic
│   │   ├── validations/      # Zod schemas
│   │   ├── auth.ts           # NextAuth config
│   │   └── prisma.ts         # Prisma client
│   └── types/                # TypeScript definitions
└── vercel.json               # Vercel config
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `DATABASE_URL` (PostgreSQL connection string from Vercel Postgres)
     - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
     - `NEXTAUTH_URL` (your Vercel URL)

3. **Set up Vercel Postgres**
   - In your Vercel project, go to Storage → Create Database → Postgres
   - Copy the connection string to `DATABASE_URL`

4. **Update build command** (in Vercel settings)
   ```bash
   npx prisma migrate deploy && next build
   ```

5. **Deploy**
   - Vercel will automatically deploy on every push to `main`

### Production Database Migration

Before deploying to production:

1. Update `prisma/schema.prisma` to use PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Or use the pre-configured production schema:
   ```bash
   cp prisma/schema.postgresql.prisma prisma/schema.prisma
   ```

## 📚 API Documentation

### Articles

- `GET /api/articles` - List all articles
  - Query params: `published`, `featured`, `categoryId`, `limit`, `skip`
- `POST /api/articles` - Create article (requires auth)
- `GET /api/articles/[id]` - Get single article
- `PUT /api/articles/[id]` - Update article (requires auth)
- `DELETE /api/articles/[id]` - Delete article (requires auth)

### Categories

- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (requires auth)

### Upload

- `POST /api/upload` - Upload image (requires auth)

### Authentication

- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

## 🧪 Development

### Database Commands

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

### Build & Test

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules, Vanilla CSS
- **Animations**: Framer Motion
- **Database**: Prisma + SQLite/PostgreSQL
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For any questions or issues, please contact the development team.

## 📧 Support

For support, email: admin@politica.com.ar

---

**Live Demo**: [https://polargofficial2026.vercel.app](https://polargofficial2026.vercel.app)

**Repository**: [https://github.com/fidubitco/politica-argentina](https://github.com/fidubitco/politica-argentina)
