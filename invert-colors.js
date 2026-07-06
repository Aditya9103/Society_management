const fs = require('fs');
const path = require('path');

const filesToInvert = [
  'client/src/pages/features/FeaturePage.jsx',
  'client/src/pages/home/components/MobilePWASection.jsx', // skip this one! I shouldn't invert the phone mockup. Wait, I will exclude it.
  'client/src/pages/home/components/CompareSection.jsx',
  'client/src/pages/home/components/SecuritySection.jsx',
  'client/src/pages/home/components/HeroSection.jsx',
  'client/src/pages/home/components/WorkflowSection.jsx'
];

filesToInvert.forEach(file => {
  if (file.includes('MobilePWASection')) return;
  
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Make sections transparent
  content = content.replace(/(<section[^>]+)bg-(slate-[89]00|\[#1E293B\])/g, '$1bg-transparent');
  content = content.replace(/(<section[^>]+)text-white/g, '$1');
  
  // Invert common text colors
  content = content.replace(/text-white/g, 'text-ink');
  content = content.replace(/text-slate-300/g, 'text-slate-700');
  content = content.replace(/text-slate-400/g, 'text-slate-600');
  
  // Invert common borders
  content = content.replace(/border-white\/10/g, 'border-slate-200');
  content = content.replace(/border-slate-700\/60/g, 'border-slate-200');
  
  // Invert common backgrounds
  content = content.replace(/bg-white\/5/g, 'bg-slate-900/5');
  content = content.replace(/bg-white\/10/g, 'bg-slate-900/10');
  content = content.replace(/bg-white\/15/g, 'bg-slate-900/15');
  
  // Remove dark prop from SectionHeader
  content = content.replace(/dark\s*\n/g, '');
  content = content.replace(/dark={true}/g, 'dark={false}');
  content = content.replace(/dark\s/g, ' ');
  
  // HeroSection specific glow adjustments
  if (file.includes('HeroSection')) {
     content = content.replace(/bg-\[rgba\(197,138,56,0\.08\)\]/g, 'bg-primary/10');
     content = content.replace(/bg-\[rgba\(47,158,110,0\.06\)\]/g, 'bg-success/10');
     content = content.replace(/bg-\[rgba\(59,130,246,0\.05\)\]/g, 'bg-blue-400/10');
     content = content.replace(/bg-slate-800\/90/g, 'bg-white/90');
     content = content.replace(/to-slate-900/g, 'to-slate-50');
     content = content.replace(/fill-white/g, 'fill-slate-900');
  }

  fs.writeFileSync(filePath, content);
  console.log(`Inverted ${file}`);
});
