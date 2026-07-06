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

  // Revert heavy opaque glass blocks back to standard clean white cards
  content = content.replace(/bg-white\/95 shadow-xl/g, 'bg-white shadow-sm border border-slate-200');
  content = content.replace(/bg-white\/95 shadow-lg/g, 'bg-white shadow-sm border border-slate-200');
  content = content.replace(/bg-white\/95/g, 'bg-white');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});
console.log('Standardized all cards to clean solid white');
