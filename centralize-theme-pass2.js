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

  // Text omissions
  content = content.replace(/text-slate-700/g, 'text-tx-secondary font-medium');
  content = content.replace(/text-slate-200/g, 'text-bd-subtle');
  content = content.replace(/text-slate-800/g, 'text-tx-secondary font-medium'); // any left?
  
  // Background omissions
  content = content.replace(/bg-slate-200/g, 'bg-bd-subtle');
  content = content.replace(/bg-slate-800/g, 'bg-bg-inverted/90');
  content = content.replace(/bg-slate-900(?!\/)/g, 'bg-bg-inverted');

  // Border omissions
  content = content.replace(/border-slate-100/g, 'border-bd-subtle');
  content = content.replace(/border-slate-700/g, 'border-bd-subtle/20');
  content = content.replace(/border-slate-800/g, 'border-bd-subtle/10');
  
  // Hovers
  content = content.replace(/hover:bg-slate-300/g, 'hover:bg-bd-strong');
  content = content.replace(/hover:text-slate-700/g, 'hover:text-tx-secondary');

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
console.log('Centralized remaining theme variables globally');
