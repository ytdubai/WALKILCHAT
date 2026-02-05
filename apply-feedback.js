const fs = require('fs');
let content = fs.readFileSync('src/pages/index.tsx', 'utf8');

// 1. INCREASE FONT SIZES (Plaid-style)
content = content.replace(/fontSize: 14,/g, 'fontSize: 18,');
content = content.replace(/fontSize: 14\.5,/g, 'fontSize: 19,');
content = content.replace(/fontSize: 17,/g, 'fontSize: 22,');
content = content.replace(/fontSize: 20,/g, 'fontSize: 26,');
content = content.replace(/fontSize: 22,/g, 'fontSize: 28,');
content = content.replace(/fontSize: 28,/g, 'fontSize: 36,');
content = content.replace(/fontSize: 48,/g, 'fontSize: 60,');

// 2. REMOVE EMOJIS (keep professional)
content = content.replace(/[🦁🔥⚡💰📞💬💳🏪🛡️⏱️👑🤖📧💼🌾☕🚗💸🎯✨🚀]/g, '');

// 3. ADD LOGO (if missing in nav)
if (!content.includes('logo-icon.jpg') && content.includes('<nav')) {
  content = content.replace(
    'import { useEffect, useState, useRef } from \'react\';',
    'import { useEffect, useState, useRef } from \'react\';\nimport Image from \'next/image\';'
  );
}

fs.writeFileSync('src/pages/index.tsx', content);
console.log('✅ Feedback applied: Bigger fonts, no emojis, professional!');
