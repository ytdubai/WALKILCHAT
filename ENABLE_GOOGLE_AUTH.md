# Enable Google & Phone Auth in Supabase ⚙️

## Google OAuth Setup

### Step 1: Go to Supabase Dashboard
https://supabase.com/dashboard/project/xjbuktmaktupkssretbt/auth/providers

### Step 2: Enable Google Provider

1. Find **"Google"** in the providers list
2. Toggle it **ON**
3. Click **"Configure"**

### Step 3: Get Google OAuth Credentials

**Option A: Use Supabase's (Easiest!)**
- Supabase provides test credentials
- Just click "Use Supabase's Google OAuth"
- Works immediately for testing!

**Option B: Create Your Own (Production)**
1. Go to https://console.cloud.google.com
2. Create new project: "WakilChat"
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URL: `https://xjbuktmaktupkssretbt.supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret
7. Paste into Supabase

### Step 4: Add Redirect URL

In Supabase Google config, add:
```
https://wakilchat.com/*
https://wakilchat.com/dashboard
```

### Step 5: Save!

Click **"Save"** - Google auth is now active! ✅

---

## Phone Auth Setup (Bird SMS)

### You Already Did This! ✅

But to verify it's working:

### Step 1: Check Phone Provider
https://supabase.com/dashboard/project/xjbuktmaktupkssretbt/auth/providers

1. Find **"Phone"** provider
2. Should be **ON** (enabled)
3. Click **"Configure"**

### Step 2: Verify Bird Integration

Should show:
- Provider: **Bird** or **Custom** (with Bird webhook)
- Test phone: Enter your number
- Click "Send test OTP"
- Check if you receive SMS

### Step 3: If Not Working

**Common Issues:**

**A. Bird API Key Not Set:**
- Auth → Phone → Settings
- Enter Bird API credentials
- Webhook URL should point to Supabase

**B. Phone Format:**
- Must include country code: `+234803...`
- Not: `0803...` ❌
- Not: `803...` ❌
- Correct: `+2348031234567` ✅

**C. Bird Account Not Funded:**
- Check Bird.com dashboard
- Ensure you have SMS credits
- Top up if needed

---

## Quick Test

### Test Google Auth:
1. Go to https://wakilchat.com/signup
2. Click **"Google"** button
3. Should redirect to Google login
4. After login → redirect to /dashboard

**If Error:** Google provider not enabled in Supabase

### Test Phone Auth:
1. Go to https://wakilchat.com/signup
2. Enter phone: `+234803...`
3. Click **"📱 Phone OTP"**
4. Should redirect to /verify-otp
5. Check phone for SMS code
6. Enter code → dashboard

**If Error:** Check Bird SMS credits or webhook config

---

## Troubleshooting

### Google Button Does Nothing:

**Fix:**
```
1. Supabase Dashboard
2. Authentication → Providers
3. Google → Toggle ON
4. Use Supabase's credentials (easiest)
5. Save
6. Try again
```

### Phone OTP Not Received:

**Fix:**
```
1. Check phone number format (+234...)
2. Check Bird.com dashboard (credits available?)
3. Check Supabase logs (Auth → Logs)
4. Verify Bird webhook is configured
```

### Quick Enable (Takes 2 Minutes):

**For Investors Demo:**
- Just enable Google with Supabase's credentials
- Phone is already working (you configured Bird)
- Both should work immediately!

---

## Current Status:

✅ **Code is ready** (buttons exist, functions work)
⏳ **Supabase config needed** (enable Google provider)
✅ **Bird SMS configured** (you did this!)

**Enable Google in Supabase and everything works!** 🚀

---

Want me to add a fallback if Google/Phone don't work yet? (Email/password still works!) ✅