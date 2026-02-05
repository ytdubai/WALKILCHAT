const fs = require('fs');
const files = [
  'src/pages/index.tsx',
  'src/pages/about.tsx',
  'src/pages/pricing.tsx',
  'src/pages/export.tsx',
  'src/pages/ai-matching.tsx',
  'src/pages/founder-supplier.tsx',
  'src/pages/help.tsx',
  'src/pages/privacy.tsx',
  'src/pages/terms.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove common emojis
  content = content.replace(/🦁/g, '');
  content = content.replace(/🔥/g, '');
  content = content.replace(/⚡/g, '');
  content = content.replace(/💰/g, '');
  content = content.replace(/💎/g, '');
  content = content.replace(/🚀/g, '');
  content = content.replace(/✨/g, '');
  content = content.replace(/👉/g, '');
  content = content.replace(/✓/g, '✓'); // Keep checkmarks
  content = content.replace(/❌/g, 'X');
  content = content.replace(/✅/g, '•');
  content = content.replace(/👑/g, '');
  content = content.replace(/🤖/g, '');
  content = content.replace(/🌍/g, '');
  content = content.replace(/📊/g, '');
  content = content.replace(/📞/g, '');
  content = content.replace(/💬/g, '');
  content = content.replace(/💳/g, '');
  content = content.replace(/🏪/g, '');
  content = content.replace(/🛡️/g, '');
  content = content.replace(/⏱️/g, '');
  content = content.replace(/🎯/g, '');
  content = content.replace(/💸/g, '');
  content = content.replace(/📧/g, '');
  content = content.replace(/💼/g, '');
  content = content.replace(/💬/g, '');
  content = content.replace(/📱/g, '');
  content = content.replace(/☕/g, '');
  content = content.replace(/🌾/g, '');
  content = content.replace(/🚗/g, '');
  
  // Keep flags (country context important)
  // Keep stars (★ for ratings)
  
  fs.writeFileSync(file, content);
  console.log(`✓ Cleaned ${file}`);
});

console.log('✅ All emojis removed, professional look achieved!');
