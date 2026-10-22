const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Mobile theme & screens
  content = content.replace(/#064e3b/gi, '#1e3a8a');
  content = content.replace(/#047857/gi, '#2563eb');
  content = content.replace(/#022c22/gi, '#0f172a');
  content = content.replace(/#e6f4ea/gi, '#eff6ff');

  // Adire & hero banner gradients
  content = content.replace(/linear-gradient\(135deg,\s*#7A2E0E,\s*#B5451B\)/gi, 'linear-gradient(135deg, #1E3A8A, #8B1E3F)');
  content = content.replace(/linear-gradient\(135deg,\s*#C9963A,\s*#B5451B\)/gi, 'linear-gradient(135deg, #C9963A, #1E3A8A)');
  content = content.replace(/linear-gradient\(90deg,\s*#7A2E0E,\s*#B5451B,\s*#7A2E0E\)/gi, 'linear-gradient(90deg, #1E3A8A, #8B1E3F, #1E3A8A)');

  // Old Ogere darks in CSS gradients
  content = content.replace(/#2C1A0E/gi, '#0F172A');
  content = content.replace(/#1A0D06/gi, '#0A0F1D');
  content = content.replace(/#0D0704/gi, '#050811');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors: ${filePath}`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', '.vite', 'build', '.gradle'].includes(entry.name)) continue;
      walkDir(fullPath);
    } else if (/\.(jsx?|tsx?|html|css|json)$/.test(entry.name) && !entry.name.includes('package-lock')) {
      processFile(fullPath);
    }
  }
}

['src', 'mobile/src', 'mobile/app.json', 'mobile/app.config.js', 'api'].forEach(p => {
  const full = path.resolve(p);
  if (fs.existsSync(full)) {
    if (fs.statSync(full).isDirectory()) walkDir(full);
    else processFile(full);
  }
});

console.log('Color rebranding script completed.');
