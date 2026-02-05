const fs = require('fs');
let content = fs.readFileSync('src/pages/index.tsx', 'utf8');

// Add import
if (!content.includes('MobileMenu')) {
  content = content.replace(
    "import Image from 'next/image';",
    "import Image from 'next/image';\nimport { MobileMenu } from '../components/MobileMenu';"
  );
}

// Add mobile menu component and mark desktop links
content = content.replace(
  '<div style={{ display: \'flex\', gap: \'1rem\', alignItems: \'center\' }}>',
  '<div className="desktop-nav-links" style={{ display: \'flex\', gap: \'1rem\', alignItems: \'center\' }}>\n              <MobileMenu />'
);

fs.writeFileSync('src/pages/index.tsx', content);
console.log('✅ Mobile menu added!');
