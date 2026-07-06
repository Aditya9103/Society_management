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
const adminDir = path.join(__dirname, 'client/src/admin');
const files = [...walkSync(componentsDir), ...walkSync(pagesDir), ...walkSync(adminDir)];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Texts
  content = content.replace(/text-slate-900/g, 'text-tx-primary');
  content = content.replace(/text-slate-800 font-medium/g, 'text-tx-primary');
  content = content.replace(/text-slate-800/g, 'text-tx-secondary font-medium');
  content = content.replace(/text-slate-600/g, 'text-tx-secondary');
  content = content.replace(/text-slate-500/g, 'text-tx-muted');
  content = content.replace(/text-slate-400/g, 'text-tx-muted');
  content = content.replace(/text-slate-300/g, 'text-tx-muted/80');

  // Backgrounds
  content = content.replace(/bg-slate-50/g, 'bg-bg-app');
  content = content.replace(/bg-white(?!\/)/g, 'bg-bg-surface'); // don't match bg-white/40
  content = content.replace(/bg-slate-100/g, 'bg-bg-subtle');

  // Borders
  content = content.replace(/border-slate-200/g, 'border-bd-subtle');
  content = content.replace(/border-slate-300/g, 'border-bd-strong');
  content = content.replace(/border-slate-800/g, 'border-slate-800'); // Leave dark borders alone for footer

  // Hovers
  content = content.replace(/hover:text-slate-900/g, 'hover:text-tx-primary');
  content = content.replace(/hover:bg-slate-100/g, 'hover:bg-bg-subtle');
  content = content.replace(/hover:border-slate-300/g, 'hover:border-bd-strong');

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
console.log('Centralized theme variables applied globally');
