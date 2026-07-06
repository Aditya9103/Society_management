const fs = require('fs');
const path = require('path');

const files = [
  'client/src/components/layout/Navbar.jsx',
  'client/src/components/layout/MobileMenu.jsx'
];

files.forEach(fileRelPath => {
  const filePath = path.join(__dirname, fileRelPath);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Convert background variables to light mode
  content = content.replace(/bg-\[var\(--ink\)\].*?border-\[var\(--line-dark\)\].*?shadow-.*?'/g, "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'");
  content = content.replace(/bg-\[var\(--ink\)\].*?border-\[var\(--line-dark\)\].*?shadow-.*?"/g, 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg"');
  
  // Convert logo variables
  content = content.replace(/bg-\[var\(--brass\)\].*?shadow-\[.*?\]/g, 'bg-primary shadow-lg');
  content = content.replace(/text-white fill-white/g, 'text-white fill-white');
  content = content.replace(/text-white(?! fill-white)(?! bg-primary)(?! \/>)(?! flex)/g, 'text-slate-900');

  // Convert off-white text to slate
  content = content.replace(/text-\[rgba\(244,245,241,0\.75\)\]/g, 'text-slate-600');
  content = content.replace(/text-\[rgba\(244,245,241,0\.65\)\]/g, 'text-slate-600');
  content = content.replace(/text-\[rgba\(244,245,241,0\.55\)\]/g, 'text-slate-500');
  
  // Convert hovers
  content = content.replace(/hover:text-white/g, 'hover:text-slate-900');
  content = content.replace(/hover:bg-white\/[0-9]+/g, 'hover:bg-slate-100');

  // Mobile menu background
  content = content.replace(/bg-\[var\(--ink\)\]/g, 'bg-white');
  content = content.replace(/border-\[var\(--line-dark\)\]/g, 'border-slate-200');

  // Specific mega menu texts
  content = content.replace(/text-\[var\(--brass-light\)\]/g, 'text-slate-900');
  content = content.replace(/text-\[var\(--brass\)\]/g, 'text-primary');
  content = content.replace(/bg-\[rgba\(192,138,62,0\.15\)\]/g, 'bg-slate-100');

  fs.writeFileSync(filePath, content);
});

console.log('Fixed Nav and MobileMenu visibility');
