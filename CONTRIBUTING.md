# Contributing to Política Argentina

Thank you for your interest in contributing to Política Argentina! This document provides guidelines and instructions for contributing to this project.

## 🎯 Code of Conduct

We are committed to providing a welcoming and professional environment. Please:

- Be respectful and constructive
- Focus on the best outcome for the project
- Accept constructive criticism gracefully
- Prioritize what's best for the community

## 🚀 Getting Started

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/politica-argentina.git
   cd politica-argentina
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your local database credentials
   ```

4. **Initialize database**
   ```bash
   npx prisma migrate dev
   npx tsx prisma/seed.ts
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### Branching Strategy

We use **Git Flow**:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Emergency production fixes

### Creating a Feature

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Commit with meaningful message
git add .
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## 💻 Coding Standards

### TypeScript

- **Use TypeScript** for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use generics when appropriate

```typescript
// ✅ Good
interface Article {
  id: string;
  title: string;
  content: string;
}

// ❌ Bad
const article: any = {...};
```

### React Components

- Use **functional components** with hooks
- Implement **Server Components** when possible
- Keep components **small and focused**
- Extract reusable logic into **custom hooks**

```tsx
// ✅ Good - Server Component
export default async function ArticlePage() {
  const articles = await getArticles();
  return <ArticleList articles={articles} />;
}

// ✅ Good - Client Component
'use client';
export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>Like</button>;
}
```

### Styling

- Use **CSS Modules** for component styles
- Follow **BEM naming** convention
- Keep styles **scoped and modular**
- Use **CSS variables** from globals.css

```css
/* ✅ Good */
.articleCard {
  background: var(--glass-bg);
  border-radius: 12px;
}

.articleCard__title {
  font-size: 1.5rem;
  color: var(--foreground);
}
``bash`

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: `ComponentName.module.css`
- Types: `types.ts` or `interface.ts`

## 📝 Commit Messages

We follow **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(articles): add pagination to article list

Add pagination component with page numbers and navigation.
Includes API changes to support limit/offset params.

Closes #123
```

```bash
fix(auth): resolve login redirect loop

Users were getting stuck in redirect loop after login.
Fixed by updating middleware configuration.

Fixes #456
```

## 🧪 Testing

### Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Test manually in browser
- [ ] Check mobile responsiveness
- [ ] Verify accessibility

### Future: Automated Tests

We plan to add:
- Unit tests (Jest/Vitest)
- Integration tests
- E2E tests (Playwright)

## 📦 Pull Request Process

### PR Checklist

- [ ] Branch is up to date with `develop`
- [ ] Code follows style guidelines
- [ ] Commit messages follow convention
- [ ] No console.log() statements
- [ ] Documentation updated if needed
- [ ] Screenshots added for UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots
If applicable

## Related Issues
Closes #XX
```

### Review Process

1. Submit PR from your feature branch to`develop`
2. CI/CD checks must pass
3. At least 1 reviewer approval required
4. Address review comments
5. Squash and merge when approved

## 🏗️ Architecture Guidelines

### Component Structure

```
src/components/
├── admin/          # Admin panel components
├── home/           # Homepage components
├── layout/         # Layout components (Header, Footer)
├── news/           # News-related components
└── providers/      # Context providers
```

### API Routes

```
src/app/api/
├── articles/       # Article CRUD
│   ├── route.ts    # GET all, POST
│   └── [id]/       # GET, PUT, DELETE single
├── categories/     # Category management
├── upload/         # File uploads
└── auth/           # Authentication
```

### Best Practices

1. **Server Components by Default**
   - Use Server Components unless you need interactivity
   - Add `'use client'` only when necessary

2. **Data Fetching**
   - Fetch data in Server Components
   - Use API routes for client-side operations
   - Implement proper loading states

3. **Error Handling**
   - Always handle errors gracefully
   - Provide meaningful error messages
   - Log errors for debugging

4. **Performance**
   - Use dynamic imports for large components
   - Optimize images with next/image
   - Implement lazy loading

5. **Security**
   - Never expose sensitive data
   - Validate all user inputs
   - Use environment variables for secrets

## 🎨 Design System

### Colors

Use CSS variables from `globals.css`:

```css
var(--primary)      /* Blue #1e40af */
var(--accent)       /* Gold #f59e0b */
var(--foreground)   /* Text color */
var(--background)   /* Background */
var(--muted)        /* Muted text */
```

### Typography

```css
var(--font-heading) /* Playfair Display */
var(--font-body)    /* Inter */
```

### Spacing

Use consistent spacing:
- Small: `0.5rem` (8px)
- Medium: `1rem` (16px)
- Large: `2rem` (32px)
- XL: `3rem` (48px)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

## ❓ Questions?

- Check [Documentation](./docs)
- Open a GitHub Discussion
- Contact: contacto@politica-argentina.com.ar

---

Thank you for contributing to Política Argentina! 🎉
