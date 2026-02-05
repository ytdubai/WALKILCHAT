#!/bin/bash
echo "Testing all navigation links..."
for page in about pricing export ai-matching founder-supplier privacy terms help
do
  if [ -f "src/pages/${page}.tsx" ]; then
    echo "✅ /${page} - exists"
  else
    echo "❌ /${page} - MISSING"
  fi
done
