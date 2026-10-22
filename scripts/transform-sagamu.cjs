const fs = require('fs');
const path = require('path');

const excludeDirs = new Set(['node_modules', '.git', 'dist', '.vercel', '.wrangler', 'playwright-report', 'test-results', 'build', '.gradle']);

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (excludeDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

const fileExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.md', '.sql', '.toml']);

let totalFilesModified = 0;
let totalReplacements = 0;

walkDir('.', (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!fileExtensions.has(ext)) return;
  if (filePath.includes('transform-sagamu.cjs') || filePath.includes('update-sos.cjs') || filePath.includes('package-lock.json')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Royal Titles & Monarchy
  content = content.replace(/Ologere of Ogere Remo/gi, 'The Akarigbo of Remoland');
  content = content.replace(/Ologere of Ogere/gi, 'The Akarigbo of Remoland');
  content = content.replace(/HRH Oba James Obafemi Saliu/g, 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA');
  content = content.replace(/Oba James Obafemi Saliu/g, 'Oba Babatunde Adewale Ajayi');
  content = content.replace(/Aafin Ologere/g, 'Aafin Akarigbo');
  content = content.replace(/Ologere Palace/g, 'Akarigbo Palace');
  content = content.replace(/Aafin Ologere/gi, 'Aafin Akarigbo');
  content = content.replace(/Ologere-in-Council/g, 'Akarigbo-in-Council');
  content = content.replace(/Ologere/g, 'Akarigbo');
  content = content.replace(/ologere/g, 'akarigbo');

  // 2. Festivals & Pageants
  content = content.replace(/Miss Olipakala/g, 'Miss Sagamu');
  content = content.replace(/miss-olipakala/g, 'miss-sagamu');
  content = content.replace(/Miss Lipakala/g, 'Miss Sagamu');
  content = content.replace(/Lipakala Day/g, 'Sagamu Day');
  content = content.replace(/Olipakala Day/g, 'Sagamu Day');
  content = content.replace(/Lipakala Cultural Centre/g, 'Sagamu Cultural Centre');
  content = content.replace(/Lipakala/g, 'Sagamu Day');
  content = content.replace(/Olipakala/g, 'Sagamu Founding Ancestors');

  // 3. Community Organizations & Associations
  content = content.replace(/Ogere Community Development Association \(OCDA\)/g, 'Sagamu Development Association (SDA)');
  content = content.replace(/Ogere Community Development Association/g, 'Sagamu Development Association');
  content = content.replace(/OCDA/g, 'SDA');
  content = content.replace(/OYDA/g, 'Sagamu Youth Congress');
  content = content.replace(/OMCOOSA/g, 'RSSOSA');
  content = content.replace(/Ositelu Memorial College/g, 'Remo Secondary School (RSS)');

  // 4. LGA & Regional
  content = content.replace(/Ikenne Local Government Area/gi, 'Sagamu Local Government Area');
  content = content.replace(/Ikenne Local Government/gi, 'Sagamu Local Government');
  content = content.replace(/Ikenne LGA/gi, 'Sagamu LGA');

  // 5. Code & Prefixes
  content = content.replace(/ogereGeoEngine/g, 'sagamuGeoEngine');
  content = content.replace(/OGERE_BOUNDS/g, 'SAGAMU_BOUNDS');
  content = content.replace(/OGERE_LANDMARKS/g, 'SAGAMU_LANDMARKS');
  content = content.replace(/isInsideOgere/g, 'isInsideSagamu');
  content = content.replace(/resolveOgereLocation/g, 'resolveSagamuLocation');
  content = content.replace(/getOgereMapUrls/g, 'getSagamuMapUrls');
  content = content.replace(/OGERE_ANCESTRAL_QUARTERS/g, 'SAGAMU_ANCESTRAL_QUARTERS');
  content = content.replace(/OGERE_QUARTER_NAMES/g, 'SAGAMU_QUARTER_NAMES');
  content = content.replace(/ogere_saas_master_config/g, 'sagamu_saas_master_config');
  content = content.replace(/ogere_preview_unlocked/g, 'sagamu_preview_unlocked');
  content = content.replace(/ogere-sos-triggered/g, 'sagamu-sos-triggered');
  content = content.replace(/ogere-broadcast-updated/g, 'sagamu-broadcast-updated');
  content = content.replace(/com\.ogeremo\.civicportal/g, 'com.sagamuremo.civicportal');
  content = content.replace(/ogere-remo-portal/g, 'sagamu-portal');
  content = content.replace(/OGR-/g, 'SGM-');

  // 6. Domain & Place Names
  content = content.replace(/ogereremo\.ng/g, 'sagamuremo.ng');
  content = content.replace(/ogereremo\.org/g, 'sagamuremo.org');
  content = content.replace(/Ogere Remo/g, 'Sagamu Remo');
  content = content.replace(/Ogere-Remo/g, 'Sagamu-Remo');
  content = content.replace(/Ogereland/g, 'Sagamu Remoland');
  content = content.replace(/ogereland/g, 'sagamu');
  content = content.replace(/OGERE REMO/g, 'SAGAMU REMO');
  content = content.replace(/OGERE/g, 'SAGAMU');
  content = content.replace(/Ogere/g, 'Sagamu');
  content = content.replace(/ogere/g, 'sagamu');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFilesModified++;
    console.log(`Transformed: ${filePath}`);
  }
});

console.log(`\nTransformation Complete! Total files updated: ${totalFilesModified}`);
