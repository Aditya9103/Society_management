const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'client/src/pages/BookDemo.jsx',
  'client/src/pages/Pricing.jsx',
  'client/src/pages/home/components/MobilePWASection.jsx',
  'client/src/components/sections/TestimonialGrid.jsx',
  'client/src/components/sections/WorkflowTimeline.jsx',
  'client/src/components/sections/SecurityStrip.jsx'
];

filesToUpdate.forEach(fileRelPath => {
  const filePath = path.join(__dirname, fileRelPath);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (fileRelPath.includes('BookDemo.jsx')) {
    content = content.replace(/text-white/g, 'text-slate-900');
  }
  
  if (fileRelPath.includes('Pricing.jsx')) {
    // Only replace the H3
    content = content.replace(/<h3 className="text-3xl font-bold text-white mb-4">/g, '<h3 className="text-3xl font-bold text-slate-900 mb-4">');
  }

  if (fileRelPath.includes('MobilePWASection.jsx')) {
    // Mobile mockup uses dark theme inside it usually, so text-white might be correct there.
    // Let's leave it as is if it's inside a dark phone bezel.
    // Looking at the grep, it has bg-emerald-500 text-white, which is correct contrast.
  }

  if (fileRelPath.includes('TestimonialGrid.jsx')) {
    content = content.replace(/bg-slate-800/g, 'bg-slate-100');
    content = content.replace(/text-white/g, 'text-slate-900');
  }

  if (fileRelPath.includes('WorkflowTimeline.jsx')) {
    content = content.replace(/text-white/g, 'text-slate-900');
  }

  if (fileRelPath.includes('SecurityStrip.jsx')) {
    content = content.replace(/text-white/g, 'text-slate-900');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
  }
});
console.log('Contrast cleanup complete');
