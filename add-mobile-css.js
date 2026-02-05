const fs = require('fs');
let content = fs.readFileSync('src/pages/index.tsx', 'utf8');

// Find the style section and add mobile CSS
const mobileCSS = `
          /* Mobile Optimizations */
          @media (max-width: 768px) {
            body {
              font-size: 16px; /* Prevent zoom on input focus */
            }
            nav {
              padding: 0.75rem 1rem !important;
            }
            h1 {
              font-size: clamp(2rem, 10vw, 3rem) !important;
              line-height: 1.2 !important;
            }
            h2 {
              font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
            }
            p {
              font-size: 1.125rem !important;
            }
            button, a {
              min-height: 44px; /* Touch-friendly */
              font-size: 1.125rem !important;
            }
          }
          
          /* Prevent horizontal scroll */
          * {
            max-width: 100%;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
`;

content = content.replace(
  '.pulse-animate {\n            animation: pulse 2s ease-in-out infinite;\n          }',
  `.pulse-animate {
            animation: pulse 2s ease-in-out infinite;
          }${mobileCSS}`
);

fs.writeFileSync('src/pages/index.tsx', content);
console.log('✅ Mobile CSS added!');
