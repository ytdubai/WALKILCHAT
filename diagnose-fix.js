// Quick diagnostic check
const fs = require('fs');

console.log('=== WAKILCHAT AUTH DIAGNOSTIC ===\n');

// Check 1: Supabase credentials in code
const supabaseFile = fs.readFileSync('src/lib/supabase.ts', 'utf8');
console.log('✓ Supabase file exists');
console.log('  URL in code:', supabaseFile.includes('xjbuktmaktupkssretbt') ? 'CORRECT' : 'WRONG');
console.log('  Using env vars:', supabaseFile.includes('process.env') ? 'YES' : 'NO');

// Check 2: AuthProvider has signIn function
const authFile = fs.readFileSync('src/lib/providers/AuthProvider.tsx', 'utf8');
console.log('\n✓ AuthProvider exists');
console.log('  Has signIn:', authFile.includes('signInWithPassword') ? 'YES' : 'NO');
console.log('  Has signUp:', authFile.includes('signUp') ? 'YES' : 'NO');

// Check 3: Login page uses auth
const loginFile = fs.readFileSync('src/pages/login.tsx', 'utf8');
console.log('\n✓ Login page exists');
console.log('  Uses useAuth:', loginFile.includes('useAuth') ? 'YES' : 'NO');
console.log('  Calls signIn:', loginFile.includes('await signIn') ? 'YES' : 'NO');

console.log('\n=== DIAGNOSIS COMPLETE ===');
console.log('\nMost likely issue: Supabase dashboard settings');
console.log('Fix: Disable email confirmation in Supabase Auth settings');
