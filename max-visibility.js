const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
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

  // Make text much darker for better contrast
  content = content.replace(/text-slate-500/g, 'text-slate-600 font-medium');
  content = content.replace(/text-slate-600(?!\s+font-medium)/g, 'text-slate-800 font-medium');
  content = content.replace(/text-slate-700/g, 'text-slate-900');
  content = content.replace(/text-ink/g, 'text-slate-900');

  // Make cards completely solid or near-solid to block background bleed
  content = content.replace(/bg-white\/[0-9]{2}/g, 'bg-white/95 shadow-xl');
  content = content.replace(/bg-slate-50\/80/g, 'bg-white/95 shadow-lg');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
console.log('Maximized visibility globally');
