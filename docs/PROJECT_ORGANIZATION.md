# 📁 Project Organization Guide

## 🏗️ Repository Structure

```
politica-argentina/
│
├── 📄 Configuration Files (Root)
│   ├── .env.example          # Environment variables template
│   ├── .eslintrc.json        # ESLint configuration
│   ├── .gitignore            # Git ignore rules
│   ├── next.config.ts        # Next.js configuration
│   ├── package.json          # Dependencies and scripts
│   ├── tsconfig.json         # TypeScript configuration
│   ├── vercel.json           # Vercel deployment config
│   └── prisma.config.ts      # Prisma configuration
│
├── 📚 Documentation (Root)
│   ├── README.md             # Main project README
│   ├── CHANGELOG.md          # Version history
│   ├── CONTRIBUTING.md       # Contribution guidelines
│   └── LICENSE               # License information
│
├── 📁 docs/                  # Detailed Documentation
│   ├── deployment/           # Deployment guides
│   │   ├── COMPLETE_DEPLOYMENT_NOW.md
│   │   ├── DEPLOYMENT_SUMMARY.md
│   │   └── QUICK_REFERENCE.md
│   └── guides/               # Feature guides
│       ├── SEO_EXTREME_STRATEGY.md
│       ├── CONTENT_CREATION_GUIDE.md
│       ├── LOCALHOST_TEST_REPORT.md
│       ├── PROJECT_SUMMARY.md
│       └── VERCEL_ENV_VARS.md
│
├── 🤖 .github/               # GitHub Configuration
│   ├── workflows/            # GitHub Actions
│   │   └── deploy.yml        # Vercel deployment workflow
│   └── ISSUE_TEMPLATE/       # Issue templates
│       ├── bug_report.md
│       └── feature_request.md
│
├── 🗄️ prisma/                # Database
│   ├── schema.prisma         # Current schema (PostgreSQL)
│   ├── schema.postgresql.prisma  # PostgreSQL schema backup
│   ├── schema.sqlite.prisma  # SQLite schema backup
│   ├── migrations/           # Migration history
│   └── seed.ts              # Database seed script
│
├── 🌐 public/                # Static Assets
│   ├── uploads/              # User-uploaded files
│   ├── images/               # Static images
│   ├── icons/                # App icons
│   └── favicon.ico           # Favicon
│
└── 💻 src/                   # Source Code
    ├── app/                  # Next.js App Router
    │   ├── (routes)          # Page routes
    │   ├── api/              # API endpoints
    │   ├── globals.css       # Global styles
    │   ├── layout.tsx        # Root layout
    │   ├── page.tsx          # Homepage
    │   ├── manifest.ts       # PWA manifest
    │   ├── robots.ts         # Robots.txt
    │   └── sitemap.ts        # Dynamic sitemap
    │
    ├── components/           # React Components
    │   ├── admin/            # Admin panel components
    │   ├── home/             # Homepage components
    │   ├── layout/           # Layout components
    │   ├── news/             # News components
    │   └── providers/        # Context providers
    │
    ├── i18n/                 # Internationalization
    │   └── locales/          # Translation files
    │       ├── es.json
    │       ├── en.json
    │       └── ...
    │
    ├── lib/                  # Utilities & Config
    │   ├── services/         # Business logic
    │   ├── validations/      # Zod schemas
    │   ├── auth.ts           # NextAuth config
    │   ├── prisma.ts         # Prisma client
    │   └── seo.config.ts     # SEO configuration
    │
    ├── types/                # TypeScript Definitions
    │   └── next-auth.d.ts    # NextAuth types
    │
    └── middleware.ts         # Route protection
```

---

## 📚 Documentation Organization

### Root Level
- **README.md**: Project overview, quick start, tech stack
- **CHANGELOG.md**: Version history and release notes
- **CONTRIBUTING.md**: Contribution guidelines
- **LICENSE**: Licensing information

### docs/deployment/
Deployment-specific documentation:
- Step-by-step guides
- Environment setup
- Troubleshooting
- Quick references

### docs/guides/
Feature and usage guides:
- SEO strategy
- Content creation
- Testing procedures
- Best practices

---

## 🗂️ Source Code Organization

### src/app/ (Next.js App Router)

```
app/
├── admin/                    # Admin panel routes
│   ├── layout.tsx            # Admin layout
│   ├── page.tsx              # Dashboard
│   ├── editor/               # Article editor
│   ├── noticias/             # News management
│   └── seo/                  # SEO tools
│
├── api/                      # API endpoints
│   ├── articles/             # Article CRUD
│   ├── categories/           # Category management
│   ├── upload/               # File uploads
│   └── auth/                 # Authentication
│
├── login/                    # Login page
├── noticias/[slug]/          # Article pages
├── seccion/[category]/       # Category pages
│
├── globals.css               # Global styles
├── layout.tsx                # Root layout
├── page.tsx                  # Homepage
├── page.module.css           # Homepage styles
│
├── manifest.ts               # PWA manifest
├── robots.ts                 # Robots.txt
└── sitemap.ts                # Dynamic sitemap
```

### src/components/ (React Components)

```
components/
├── admin/                    # Admin-specific
│   └── LogoutButton.tsx
│
├── home/                     # Homepage
│   └── HeroSection.tsx
│
├── layout/                   # Layout
│   ├── Header.tsx
│   ├── Header.module.css
│   ├── Footer.tsx
│   └── Footer.module.css
│
├── news/                     # News components
│   ├── NewsCard.tsx
│   └── NewsCard.module.css
│
└── providers/                # Context providers
    └── SessionProvider.tsx
```

### src/lib/ (Utilities)

```
lib/
├── services/                 # Business logic
│   ├── article.service.ts
│   └── category.service.ts
│
├── validations/              # Zod schemas
│   └── article.schema.ts
│
├── auth.ts                   # NextAuth configuration
├── prisma.ts                 # Prisma client
├── seo.config.ts             # SEO configuration
└── mock-data.ts              # Mock data (dev)
```

---

## 🎨 CSS Organization

### Naming Convention

We use **CSS Modules** with a modified BEM approach:

```css
/* ComponentName.module.css */

.component { }                /* Block */
.component__element { }       /* Element */
.component--modifier { }      /* Modifier */
.component__element--modifier { }
```

### Global Styles

```
globals.css
├── CSS Variables           (:root)
├── Reset Styles            (*, html, body)
├── Typography              (h1-h6, p, a)
├── Layout Utilities        (.container, .grid)
├── Component Utilities     (.btn, .card)
└── Responsive Utilities    (@media queries)
```

### Component Styles

Each component has its own `.module.css` file:
- Scoped to component
- No global pollution
- Easy to maintain
- Colocated with component

---

## 🗄️ Database Organization

### Prisma Schema

```prisma
schema.prisma
├── generator               # Prisma Client config
├── datasource              # Database connection
├── Models
│   ├── User                # Authentication
│   ├── Article             # News articles
│   └── Category            # Article categories
└── Relations              # Foreign keys
```

### Migrations

```
migrations/
├── 20251123033005_init/    # Initial schema
│   └── migration.sql
└── migration_lock.toml     # Lock file
```

---

## 🔐 Environment Variables

### Structure

```
.env (local - gitignored)
.env.example (template - committed)
```

### Categories

- **Database**: `DATABASE_URL`
- **Authentication**: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- **API Keys**: Third-party services
- **Feature Flags**: Enable/disable features

---

## 📦 Build Output

### Development
```
.next/               # Next.js build cache
node_modules/        # Dependencies
```

### Production (Vercel)
```
.vercel/            # Vercel build cache
```

**All build outputs are gitignored**

---

## 🚀 Scripts Organization

### package.json Scripts

**Development**
```json
"dev"            # Start dev server
"build"          # Build for production
"start"          # Start production server
"lint"           # Run ESLint
```

**Database**
```json
"db:generate"    # Generate Prisma client
"db:migrate"     # Run migrations (dev)
"db:seed"        # Seed database
"db:studio"      # Open Prisma Studio
"db:reset"       # Reset database
```

---

## 📝 Naming Conventions

### Files
- **Components**: `PascalCase.tsx`
- **Utils**: `camelCase.ts`
- **Styles**: `ComponentName.module.css`
- **Types**: `types.ts`
- **Config**: `kebab-case.config.ts`

### Folders
- **lowercase**: `components/`, `lib/`, `utils/`
- **Route segments**: `app/admin/`, `app/api/`

### Code
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes/Interfaces**: `PascalCase`
- **Functions**: `camelCase`

---

## 🧹 Keep Clean

### Regular Maintenance

- [ ] Remove unused dependencies
- [ ] Delete commented code
- [ ] Clean up console.logs
- [ ] Update documentation
- [ ] Remove unused files
- [ ] Organize imports
- [ ] Format code consistently

### Git Hygiene

- [ ] Meaningful commit messages
- [ ] Small, focused commits
- [ ] Review before pushing
- [ ] Keep .gitignore updated
- [ ] Delete merged branches

---

## 🎯 Best Practices

1. **One component per file**
2. **Colocate related files** (component + styles)
3. **Use barrel exports** for cleaner imports
4. **Separate concerns** (UI, logic, data)
5. **Document complex code**
6. **Use TypeScript strictly**
7. **Test before committing**
8. **Follow conventions**

---

## 📊 Project Health

### Keep Track Of:
- Bundle size
- Dependencies count
- Code coverage (future)
- Build times
- Performance metrics

### Regular Reviews:
- Weekly: Code quality
- Monthly: Dependencies updates
- Quarterly: Architecture review
- Yearly: Major refactoring

---

**Last Updated**: 2025-11-23  
**Next Review**: 2025-12-23
