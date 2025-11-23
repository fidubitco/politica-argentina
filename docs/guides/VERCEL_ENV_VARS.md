# 🔐 Vercel Environment Variables - Quick Reference

## Copy these values to Vercel Dashboard

### 1. NEXTAUTH_SECRET
```
5/5sdgg+oNyyJjFV/q4b85FAjgtOmKSp0e+6GWl3Dug=
```

### 2. NEXTAUTH_URL
```
https://polargofficial2026.vercel.app
```

### 3. DATABASE_URL
```
[COPY FROM VERCEL POSTGRES DASHBOARD - POSTGRES_PRISMA_URL]
```
**How to get this:**
1. Go to Vercel → Storage → Your Postgres DB
2. Click ".env.local" tab
3. Copy the value of `POSTGRES_PRISMA_URL`

---

## 🛠️ Build Command Override

In Vercel Settings → Build & Development Settings:

```bash
npx prisma generate && npx prisma migrate deploy && next build
```

---

## 📝 Where to Add These

1. Go to: https://vercel.com/fidubitco/polargofficial2026/settings/environment-variables
2. Add each variable above
3. Select: ✅ Production ✅ Preview ✅ Development
4. Click "Save"

---

## 🔄 After Adding Variables

1. Go to: Deployments tab
2. Click "Redeploy" on latest deployment
3. Wait ~2-3 minutes for build

---

## ✅ Test Login Credentials

After deployment:
- **URL**: https://polargofficial2026.vercel.app/login
- **Email**: admin@politica.com.ar
- **Password**: admin123

---

## 🚨 Important Notes

- The database will be EMPTY initially (no articles)
- You'll need to create articles via the admin panel
- Or run the seed script manually (see below)

---

## 🌱 Optional: Seed Production Database

If you want to populate with sample data:

1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Pull env vars: `vercel env pull .env.production`
4. Run seed: `DATABASE_URL="[production-url]" npx tsx prisma/seed.ts`

---

## 📊 Monitoring

After deployment, monitor:
- Vercel Dashboard → Analytics
- Vercel Dashboard → Logs (for errors)
- Browser Console (for frontend errors)
