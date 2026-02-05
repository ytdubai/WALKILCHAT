const fs = require('fs');
let content = fs.readFileSync('src/pages/index.tsx', 'utf8');

// Add mobile viewport meta
content = content.replace(
  '<meta name="description"',
  '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />\n        <meta name="description"'
);

// Fix padding for mobile
content = content.replace(/padding: '1rem'/g, "padding: 'min(1.25rem, 5vw)'");
content = content.replace(/padding: '2rem'/g, "padding: 'min(2rem, 6vw)'");
content = content.replace(/padding: '4rem 2rem'/g, "padding: 'min(4rem, 8vw) min(2rem, 5vw)'");

// Make nav responsive
content = content.replace(
  /maxWidth: '1200px', margin: '0 auto', padding: '1rem'/g,
  "maxWidth: '1200px', margin: '0 auto', padding: 'min(1rem, 4vw)'"
);

// Touch-friendly buttons (min 44px height)
content = content.replace(
  /padding: '0\.5rem 1\.5rem'/g,
  "padding: '0.75rem 1.5rem'"
);

// Ensure no overflow
content = content.replace(
  /<div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>/g,
  "<div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', overflowX: 'hidden' }}>"
);

fs.writeFileSync('src/pages/index.tsx', content);
console.log('✅ Mobile optimized!');
