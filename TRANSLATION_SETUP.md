# Translation Setup Guide - WakilChat™

## Google Cloud Translation API Setup

WakilChat uses Google Cloud Translation API for Amharic ↔ English translation in chat.

### Step 1: Enable Translation API

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable **Cloud Translation API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Cloud Translation API"
   - Click "Enable"

### Step 2: Get API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key
4. (Optional) Restrict the key:
   - Click "Edit API key"
   - Under "API restrictions", select "Restrict key"
   - Choose "Cloud Translation API"
   - Save

### Step 3: Add to Environment

Open `/root/wakilchat/.env` and add:

```env
GOOGLE_CLOUD_TRANSLATE_KEY="AIzaSy..."
```

### Step 4: Restart Server

```bash
cd /root/wakilchat
npm run dev
```

## How Translation Works

### In Chat:
1. User types message in Amharic or English
2. **Translation toggle** in header (ON by default)
3. Each message has **"Translate" button**
4. Click to translate:
   - Amharic → English
   - English → Amharic
5. Click again to see original

### Features:
- ✅ Automatic language detection
- ✅ Toggle translation on/off per conversation
- ✅ Per-message translation (click to translate individual messages)
- ✅ Shows both original + translated text
- ✅ Works with Socket.io real-time chat
- ✅ Graceful degradation (works without API key, just no translation)

## Supported Languages

**Phase 1 (MVP):**
- Amharic (አማርኛ)
- English

**Future expansion:**
- Arabic
- Somali
- Swahili
- Tigrinya
- Oromo
- French
- Mandarin

## Cost Estimation

Google Cloud Translation API pricing:
- **Free tier:** First 500,000 characters/month
- **Paid:** $20 per 1 million characters

**Example:**
- Average message: 50 characters
- 10,000 messages/month = 500,000 characters = **FREE**
- 100,000 messages/month = 5M characters = **$100/month**

## Fallback Behavior

If API key is not configured:
- ✅ App continues to work normally
- ✅ Translation toggle is hidden
- ✅ Chat still functions (just no translation)
- ✅ No errors shown to users

This allows development/testing without API costs.

## Testing Translation

1. Open chat between two users
2. Type message in English: "Hello, how are you?"
3. Click "Translate" button
4. Should show Amharic: "ሰላም እንደምን ነህ?"
5. Type in Amharic: "እሺ ነኝ አመሰግናለሁ"
6. Click "Translate" → Should show: "I'm fine, thank you"

## Troubleshooting

### "Translation service not configured"
- Add `GOOGLE_CLOUD_TRANSLATE_KEY` to `.env`
- Restart server

### Translation returns original text
- Check API key is valid
- Verify API is enabled in Google Cloud Console
- Check console for error messages

### Amharic text shows as boxes
- Install Ethiopic font (Noto Sans Ethiopic is included in globals.css)
- Check browser font rendering

## Alternative: Meta NLLB Model (Offline)

For privacy or cost reasons, can switch to Meta's No Language Left Behind model (runs locally, no API costs).

Would require:
- Python backend service
- Model download (~600MB)
- More server resources

Currently using Google Cloud for simplicity and speed.
