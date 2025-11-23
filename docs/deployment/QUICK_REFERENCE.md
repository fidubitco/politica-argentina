# 🎯 DEPLOYMENT QUICK REFERENCE

**Copy these values exactly as shown**

---

## 📋 ENVIRONMENT VARIABLES

### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: [GET FROM VERCEL POSTGRES → .env.local → POSTGRES_PRISMA_URL]
Environments: ✅ Production ✅ Preview ✅ Development
```

**How to get**:
1. Vercel → Storage → Your Postgres DB → .env.local tab
2. Copy the value of `POSTGRES_PRISMA_URL`
3. Paste as DATABASE_URL value

---

### Variable 2: NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: 5/5sdgg+oNyyJjFV/q4b85FAjgtOmKSp0e+6GWl3Dug=
Environments: ✅ Production ✅ Preview ✅ Development
```

**Copy this exactly** ☝️

---

### Variable 3: NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://polargofficial2026.vercel.app
Environments: ✅ Production ✅ Preview ✅ Development
```

**Copy this exactly** ☝️

---

## 🔨 BUILD COMMAND

```bash
npx prisma generate && npx prisma migrate deploy && next build
```

**Copy this exactly** ☝️

**Where to add**:
- Settings → General → Build & Development Settings
- Click "Override" on Build Command
- Paste the command above

---

## 🔗 IMPORTANT URLS

### Vercel Dashboard
```
https://vercel.com/fidubitco/polargofficial2026
```

### Environment Variables
```
https://vercel.com/fidubitco/polargofficial2026/settings/environment-variables
```

### Build Settings
```
https://vercel.com/fidubitco/polargofficial2026/settings
```

### Deployments
```
https://vercel.com/fidubitco/polargofficial2026/deployments
```

### Your Live Site (after deployment)
```
https://polargofficial2026.vercel.app
```

### Admin Login (after deployment)
```
https://polargofficial2026.vercel.app/login
```

---

## 🔐 LOGIN CREDENTIALS

```
Email: admin@politica.com.ar
Password: admin123
```

⚠️ **Change password immediately after first login!**

---

## ✅ DEPLOYMENT STEPS (Quick Version)

1. **Create Postgres DB**
   - Storage → Create Database → Postgres

2. **Add 3 Environment Variables**
   - DATABASE_URL (from Postgres)
   - NEXTAUTH_SECRET (see above)
   - NEXTAUTH_URL (see above)

3. **Update Build Command**
   - Settings → Build Command → Override
   - Paste command (see above)

4. **Deploy**
   - Deployments → Redeploy

---

## 📊 WHAT TO EXPECT

### Build Time
- **Duration**: 2-3 minutes
- **Steps**: Install → Prisma → Migrate → Build → Deploy

### After Deployment
- ✅ Site is live
- ✅ Database is connected
- ⚠️ **No content yet** (database is empty)

### Next Steps
1. Login to admin
2. Create articles (use templates in CONTENT_CREATION_GUIDE.md)
3. Populate homepage

---

## 🎯 SUCCESS CRITERIA

Your deployment is successful when:

- [ ] Build completes without errors
- [ ] Site loads at https://polargofficial2026.vercel.app
- [ ] Login page works
- [ ] Can login with admin credentials
- [ ] Admin panel loads
- [ ] No 500 errors

---

## 🆘 QUICK TROUBLESHOOTING

### Build fails?
→ Check environment variables are set correctly

### Can't login?
→ Verify NEXTAUTH_SECRET and NEXTAUTH_URL

### Database error?
→ Check DATABASE_URL includes `?sslmode=require`

### 500 error?
→ Check Vercel function logs in dashboard

---

## 📞 FULL GUIDES

For detailed instructions, see:
- **DEPLOY_NOW.md** - Step-by-step with screenshots
- **DEPLOYMENT_SUMMARY.md** - Complete deployment guide
- **DEPLOYMENT_CHECKLIST.md** - Detailed checklist

---

**Ready to deploy? Open DEPLOY_NOW.md and follow along! 🚀**
