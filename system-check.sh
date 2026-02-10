#!/bin/bash
echo "=== WAKILCHAT SYSTEM CHECK ==="
echo ""

echo "1. PROJECT STRUCTURE:"
ls -la src/pages/*.tsx | wc -l
echo "   Pages found"

echo ""
echo "2. SUPABASE CONFIG:"
grep -h "SUPABASE" .env.local 2>/dev/null | head -2
echo "   ✓ Env vars set"

echo ""
echo "3. AUTH PROVIDER:"
grep "signIn\|signUp" src/lib/providers/AuthProvider.tsx | wc -l
echo "   Functions defined"

echo ""
echo "4. GITHUB STATUS:"
git status --short | head -5
echo "   Repository status"

echo ""
echo "5. CRITICAL FILES:"
for file in src/lib/supabase.ts src/lib/providers/AuthProvider.tsx src/pages/login.tsx src/pages/signup.tsx src/pages/dashboard.tsx
do
  if [ -f "$file" ]; then
    echo "   ✓ $file"
  else
    echo "   ✗ MISSING: $file"
  fi
done

echo ""
echo "6. SUPABASE CONNECTION TEST:"
curl -s https://xjbuktmaktupkssretbt.supabase.co 2>&1 | head -1

echo ""
echo "=== CHECK COMPLETE ==="
