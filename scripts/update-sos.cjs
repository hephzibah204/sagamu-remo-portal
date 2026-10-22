const fs = require('fs');

let code = fs.readFileSync('src/components/SosHeaderModal.jsx', 'utf8');

code = code.replace(
  "import { resolveOgereLocation, getOgereMapUrls, isInsideOgere } from '../services/ogereGeoEngine';",
  "import { resolveSagamuLocation as resolveOgereLocation, getSagamuMapUrls as getOgereMapUrls, isInsideSagamu as isInsideOgere } from '../services/sagamuGeoEngine';"
);

code = code.replace(
  /name: 'Ogere Police Post',/g,
  "name: 'Sagamu Area Command Police',"
);

code = code.replace(
  /name: 'Aafin Ologere Palace Vigilante',/g,
  "name: 'Aafin Akarigbo Royal Palace Watch',"
);

code = code.replace(
  /name: 'Ogere Specialist Medical Clinic',/g,
  "name: 'OOUTH Emergency & Trauma Centre',"
);

code = code.replace(
  /desc: 'Ogere Remo Rapid Tactical Response Team',/g,
  "desc: 'Sagamu Joint Tactical Response Team',"
);

code = code.replace(
  /desc: 'Sagamu \/ Ogere Corridor Tollgate Emergency',/g,
  "desc: 'Sagamu Interchange Corridor Tollgate Emergency',"
);

code = code.replace(
  /const OGERE_SECTORS = \[([\s\S]*?)\];/m,
  `const OGERE_SECTORS = [
  'Offin (Aafin Akarigbo & Ita Oba Axis)',
  'Makun (Ewusi Palace & Market Axis)',
  'Sabo International Kolanut District',
  'Hospital Road / OOUTH Medical Belt',
  'Sagamu Interchange & Expressway Corridor',
  'Sonyindo & Epe Quarters Axis',
  'Batoro / Ijagba / Oko Perimeter',
];`
);

code = code.replace(/OGERE EMERGENCY COMMAND/g, 'SAGAMU EMERGENCY COMMAND');
code = code.replace(/Ogere Remo/g, 'Sagamu');
code = code.replace(/ogere-sos-triggered/g, 'sagamu-sos-triggered');
code = code.replace(/Ogere Police/g, 'Sagamu Police');
code = code.replace(/Ogere/g, 'Sagamu');

fs.writeFileSync('src/components/SosHeaderModal.jsx', code, 'utf8');
console.log('Updated SosHeaderModal.jsx successfully');
