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

const pagesDir = path.join(__dirname, 'client/src/pages');
const files = walkSync(pagesDir);

const bgRegex = /\b(bg-slate-50|bg-white|bg-\[var\(--paper\)\]|bg-slate-100)\b/g;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/(<section[^>]+className="[^"]+)"/g, (match, p1) => {
    return p1.replace(bgRegex, 'bg-transparent') + '"';
  });
  
  content = content.replace(/(<div[^>]+className="[^"]*min-h-screen[^"]*")/, (match) => {
    return match.replace(bgRegex, 'bg-transparent');
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
