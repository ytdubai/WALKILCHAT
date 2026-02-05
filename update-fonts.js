const fs = require('fs');
let content = fs.readFileSync('src/pages/index.tsx', 'utf8');

// Navigation - make bigger
content = content.replace(/fontSize: '1\.5rem'/g, "fontSize: '1.75rem'");
content = content.replace(/width={40} height={40}/g, "width={48} height={48}");

// Hero section - much larger
content = content.replace(/fontSize: '0\.875rem'/g, "fontSize: '1rem'");
content = content.replace(/clamp\(2\.5rem, 8vw, 4\.5rem\)/g, "clamp(3rem, 9vw, 5.5rem)");
content = content.replace(/fontSize: '1\.25rem', color: '#ccc'/g, "fontSize: '1.5rem', color: '#ccc'");

// Body text - bigger
content = content.replace(/fontSize: '1rem'/g, "fontSize: '1.125rem'");
content = content.replace(/fontSize: '1\.125rem'/g, "fontSize: '1.25rem'");

// Stats - bigger
content = content.replace(/fontSize: '2\.5rem', fontWeight: 'bold', color: '#FFD700'/g, "fontSize: '3rem', fontWeight: 'bold', color: '#FFD700'");

// Section headings - much larger  
content = content.replace(/clamp\(2rem, 5vw, 3\.5rem\)/g, "clamp(2.5rem, 6vw, 4rem)");
content = content.replace(/clamp\(2rem, 5vw, 3rem\)/g, "clamp(2.5rem, 6vw, 3.5rem)");

// Button text - bigger
content = content.replace(/padding: '1\.25rem 2\.5rem'/g, "padding: '1.5rem 3rem'");
content = content.replace(/fontSize: '1\.25rem', fontWeight: 'bold'/g, "fontSize: '1.5rem', fontWeight: 'bold'");

// Footer - slightly bigger
content = content.replace(/fontSize: '1\.5rem', fontWeight: 'bold'\s*}\s*>\s*<span style={{ color: '#FFD700' }}>Wakil/g, "fontSize: '1.75rem', fontWeight: 'bold' }}>\n              <span style={{ color: '#FFD700' }}>Wakil");

fs.writeFileSync('src/pages/index.tsx', content);
console.log('✅ Fonts updated to Plaid-size!');
