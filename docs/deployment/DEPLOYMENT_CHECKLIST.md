# 🚀 Vercel Production Deployment Checklist

## ✅ Step 1: Code Pushed to GitHub
**Status**: ✓ COMPLETE
- Latest code pushed to `main` branch
- Commit: "feat: Full-stack implementation with authentication and database"

---

## 📊 Step 2: Set Up Vercel Postgres Database

1. Go to your Vercel project dashboard: https://vercel.com/fidubitco/polargofficial2026
2. Click on **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Click **"Create"**
6. Wait for database to be provisioned
7. Go to the **".env.local"** tab in the database settings
8. Copy the `POSTGRES_PRISMA_URL` value (this will be your `DATABASE_URL`)

---

## 🔐 Step 3: Configure Environment Variables

Go to: **Settings** → **Environment Variables** in your Vercel project

Add the following variables for **Production**, **Preview**, and **Development**:

### Required Variables:

1. **DATABASE_URL**
   - Value: `[Paste the POSTGRES_PRISMA_URL from Step 2]`
   - Example: `postgres://default:xxx@xxx.postgres.vercel-storage.com/verceldb?sslmode=require`

2. **NEXTAUTH_SECRET**
   - Generate with: `openssl rand -base64 32`
   - Or use: `your-super-secret-key-change-this-in-production`
   - Value: `[Your generated secret]`

3. **NEXTAUTH_URL**
   - Value: `https://polargofficial2026.vercel.app`

---

## 🛠️ Step 4: Update Build Settings

1. Go to: **Settings** → **General** → **Build & Development Settings**
2. Override the **Build Command** with:
   ```bash
   npx prisma generate && npx prisma migrate deploy && next build
   ```
3. Click **"Save"**

---

## 🗄️ Step 5: Update Prisma Schema for Production

**IMPORTANT**: Before the next deployment, you need to switch to PostgreSQL.

### Option A: Manual Update (Recommended)
1. Open `prisma/schema.prisma`
2. Change line 7 from:
   ```prisma
   provider = "sqlite"
   ```
   to:
   ```prisma
   provider = "postgresql"
   ```
3. Commit and push:
   ```bash
   git add prisma/schema.prisma
   git commit -m "chore: switch to PostgreSQL for production"
   git push origin main
   ```

### Option B: Use Pre-configured Schema
```bash
cp prisma/schema.postgresql.prisma prisma/schema.prisma
git add prisma/schema.prisma
git commit -m "chore: switch to PostgreSQL for production"
git push origin main
```

---

## 🚀 Step 6: Deploy

Once you've completed Steps 2-5:

1. Vercel will **automatically deploy** when you push the schema change
2. Or manually trigger a deployment:
   - Go to **Deployments** tab
   - Click **"Redeploy"** on the latest deployment

---

## 🧪 Step 7: Verify Deployment

After deployment completes:

1. **Visit the site**: https://polargofficial2026.vercel.app
2. **Test the homepage**: Should load with articles
3. **Test login**: Go to `/login`
   - Email: `admin@politica.com.ar`
   - Password: `admin123`
4. **Test admin panel**: Should redirect to `/admin` after login
5. **Test creating an article**: Go to `/admin/editor`

---

## ⚠️ Troubleshooting

### If build fails:
1. Check the build logs in Vercel
2. Verify all environment variables are set correctly
3. Ensure `DATABASE_URL` is the Prisma URL (not the direct URL)

### If database connection fails:
1. Verify `DATABASE_URL` includes `?sslmode=require`
2. Check that migrations ran successfully in build logs
3. Try redeploying after verifying env vars

### If authentication doesn't work:
1. Verify `NEXTAUTH_SECRET` is set
2. Verify `NEXTAUTH_URL` matches your Vercel domain
3. Check browser console for errors

---

## 📝 Post-Deployment Tasks

After successful deployment:

1. **Seed the production database** (if needed):
   - You'll need to run the seed script manually or create articles via the admin panel

2. **Update DNS** (if using custom domain):
   - Add your custom domain in Vercel settings
   - Update `NEXTAUTH_URL` to match

3. **Monitor**:
   - Check Vercel Analytics
   - Monitor error logs in Vercel dashboard

---

## 🎉 Success Criteria

- ✅ Site loads at https://polargofficial2026.vercel.app
- ✅ Homepage displays articles from database
- ✅ Login works and redirects to admin
- ✅ Admin panel is accessible
- ✅ Can create/edit/delete articles
- ✅ No console errors

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure database migrations completed successfully
