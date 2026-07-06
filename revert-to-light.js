const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.jsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const componentsDir = path.join(__dirname, 'client/src/components');
const pagesDir = path.join(__dirname, 'client/src/pages');
const files = [...walkSync(componentsDir), ...walkSync(pagesDir)];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Revert dark cards to standard white cards with glassmorphism
  content = content.replace(/bg-slate-700\/60/g, 'bg-white/80 backdrop-blur-xl shadow-lg border-white/50');
  content = content.replace(/bg-slate-700\/50/g, 'bg-white/60 backdrop-blur-lg shadow-md');
  content = content.replace(/bg-slate-800\/50/g, 'bg-slate-50/80');
  content = content.replace(/bg-slate-800\/80/g, 'bg-slate-100');
  
  // Revert borders
  content = content.replace(/border-slate-700\/60/g, 'border-slate-200');
  content = content.replace(/border-slate-700/g, 'border-slate-200');
  
  // Revert text
  content = content.replace(/text-slate-100/g, 'text-slate-800');
  content = content.replace(/text-slate-300/g, 'text-slate-600');
  content = content.replace(/text-slate-400/g, 'text-slate-500');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
console.log('Reverted UI back to light mode variables');
