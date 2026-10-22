// Canonical Ancestral Quarters of Sagamu (Shagamu), Ogun State
// Sagamu was founded in 1872 by the historic confederation of 13 autonomous Remo settlements:
// 1. Offin, 2. Makun, 3. Sonyindo, 4. Epe, 5. Ibido, 6. Igbepa, 7. Ado, 8. Oko, 9. Ipoji, 10. Batoro, 11. Ijoku, 12. Latawa, 13. Ijagba

export const SAGAMU_ANCESTRAL_QUARTERS = [
  // The 13 Historic Confederate Quarters of Sagamu
  { id: 'offin', name: 'Offin (Aafin Akarigbo Royal Seat)', ward: 'Offin Ward', zone: 'Central' },
  { id: 'makun', name: 'Makun (Ewusi Palace Axis)', ward: 'Makun Ward 1', zone: 'South-Central' },
  { id: 'sonyindo', name: 'Sonyindo', ward: 'Sonyindo Ward', zone: 'North' },
  { id: 'epe', name: 'Epe-Sagamu', ward: 'Epe Ward', zone: 'East' },
  { id: 'ibido', name: 'Ibido', ward: 'Ibido Ward', zone: 'Central' },
  { id: 'igbepa', name: 'Igbepa', ward: 'Igbepa Ward', zone: 'North-East' },
  { id: 'ado', name: 'Ado-Sagamu', ward: 'Ado Ward', zone: 'South' },
  { id: 'oko', name: 'Oko', ward: 'Oko Ward', zone: 'West' },
  { id: 'ipoji', name: 'Ipoji', ward: 'Ipoji Ward', zone: 'Central' },
  { id: 'batoro', name: 'Batoro', ward: 'Batoro Ward', zone: 'West' },
  { id: 'ijoku', name: 'Ijoku', ward: 'Ijoku Ward', zone: 'Central-East' },
  { id: 'latawa', name: 'Latawa', ward: 'Latawa Ward', zone: 'North-West' },
  { id: 'ijagba', name: 'Ijagba', ward: 'Ijagba Ward', zone: 'South-East' },

  // Metropolitan, Commercial & Institutional Corridors
  { id: 'sabo_market', name: 'Sabo (International Kolanut Hub)', ward: 'Sabo Ward', zone: 'Commercial' },
  { id: 'ita_oba', name: 'Ita Oba (Central Palace Square)', ward: 'Offin Ward', zone: 'Royal' },
  { id: 'gra_expressway', name: 'Sagamu GRA & Expressway Interchange Corridor', ward: 'GRA Corridor', zone: 'Metropolitan' },
  { id: 'oouth_axis', name: 'OOUTH / University Hospital Corridor', ward: 'Hospital Road', zone: 'Medical' },
  { id: 'industrial_zone', name: 'Elephant Cement / Lafarge Industrial Belt', ward: 'Industrial', zone: 'Industrial' },
];

export const SAGAMU_QUARTER_NAMES = [
  'Offin (Aafin Akarigbo)',
  'Makun',
  'Sonyindo',
  'Epe',
  'Ibido',
  'Igbepa',
  'Ado',
  'Oko',
  'Ipoji',
  'Batoro',
  'Ijoku',
  'Latawa',
  'Ijagba',
  'Sabo Commercial Quarter',
  'Ita Oba Central Palace Axis',
  'GRA & Expressway Interchange Corridor',
  'OOUTH / Hospital Road Axis',
  'Lafarge Industrial Belt',
];

// Backward compatibility alias for legacy imports
export const OGERE_ANCESTRAL_QUARTERS = SAGAMU_ANCESTRAL_QUARTERS;
export const OGERE_QUARTER_NAMES = SAGAMU_QUARTER_NAMES;
