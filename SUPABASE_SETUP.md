# Supabase Setup Guide for WakilChat™

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign in or create account
3. Click "New Project"
4. Fill in:
   - **Name:** WakilChat
   - **Database Password:** (generate strong password - SAVE THIS!)
   - **Region:** Choose closest to Ethiopia (e.g., Frankfurt, Mumbai)
5. Click "Create new project" (takes ~2 minutes)

## Step 2: Get Credentials

Once project is created:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** tab
3. Copy these values:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGc...
service_role key: eyJhbGc... (keep secret!)
```

## Step 3: Update .env File

Open `/root/wakilchat/.env` and update:

```env
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."
```

## Step 4: Set Up Storage Bucket

1. In Supabase dashboard, go to **Storage** (sidebar)
2. Click "Create a new bucket"
3. Name: `product-images`
4. **Public bucket:** Toggle ON
5. Click "Create bucket"

### Set Up Storage Policies

1. Go to **SQL Editor** (sidebar)
2. Click "+ New query"
3. Paste contents of `scripts/setup-storage.sql`
4. Click "Run"

This creates policies so:
- Anyone can view product images (public)
- Authenticated users can upload
- Users can only delete their own images

## Step 5: Configure Authentication

1. Go to **Authentication** → **Providers** (sidebar)
2. Enable **Email** (already enabled by default)
3. For **Google OAuth** (optional):
   - Toggle Google ON
   - Add your Google OAuth credentials
   - Authorized redirect: `https://xxxxxxxxxxxxx.supabase.co/auth/v1/callback`

## Step 6: Test Connection

```bash
cd /root/wakilchat
npm run dev
```

Open http://localhost:3000

1. Try signing up with email
2. Check Supabase **Authentication** → **Users** to see new user
3. Try uploading product with images
4. Check **Storage** → **product-images** to see uploaded files

## Troubleshooting

### "Invalid API key"
- Double-check you copied the full `anon key` from Supabase dashboard
- Make sure no extra spaces in .env file

### "Bucket not found"
- Create `product-images` bucket in Storage section
- Make sure it's set to **public**

### Images not uploading
- Run the storage policies SQL script
- Check browser console for errors

### Auth not working
- Verify `NEXT_PUBLIC_SUPABASE_URL` starts with `https://`
- Restart dev server after changing .env: `npm run dev`

## Database Migration (Already Done)

Database tables are already migrated via Prisma. Supabase Auth users will sync to our `User` table automatically via the sync logic in `lib/auth/sync.ts`.

## Ready to Go!

Once credentials are added, the full stack works:
✅ Auth (email, phone OTP, Google)
✅ Product listings with image upload
✅ AI matching
✅ Real-time chat
✅ All database operations
